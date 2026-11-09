// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/math/SafeCast.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Dungeon of Miners — fixed-term DOM staking
/// @notice Stake DOM into a fixed-term plan and earn a fixed APR, paid in DOM at maturity.
///
///         Rules (enforced on-chain, identical for everyone):
///         - The full reward of a position is RESERVED from the reward pool the moment you stake.
///           A stake that the pool cannot fully cover is rejected, so the contract can never
///           promise more rewards than it actually holds.
///         - At or after maturity: unstake returns principal + the full reward.
///         - Before maturity: rewards are forfeited (returned to the reward pool) and principal
///           is returned. If you unstake within the first 7 days of the position, an additional
///           10% principal penalty applies; the penalty also goes to the reward pool.
///         - Staked principal and reserved rewards can never be withdrawn by the owner. The owner
///           can only withdraw the unreserved part of the reward pool.
///         - Pausing only blocks NEW stakes. Unstaking always works.
///
/// @dev    APR is simple (non-compounding): reward = amount * aprBps * duration / (10_000 * 365 days).
///         Changing or disabling a plan only affects new stakes; existing positions keep the
///         terms they were opened with.
contract DomStaking is Ownable2Step, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ------------------------------------------------------------------
    // Types
    // ------------------------------------------------------------------

    struct Plan {
        uint64 duration; // lock length in seconds
        uint16 aprBps; // annual rate in basis points (1200 = 12%)
        bool active; // accepts new stakes
    }

    struct Position {
        uint128 amount; // principal
        uint128 reward; // full reward paid at maturity (reserved at stake time)
        uint64 start;
        uint64 end;
        uint8 planId;
        bool closed;
    }

    // ------------------------------------------------------------------
    // Constants
    // ------------------------------------------------------------------

    uint256 public constant BPS = 10_000;
    uint256 public constant YEAR = 365 days;
    /// @notice Unstaking within this window after staking costs EARLY_PENALTY_BPS of principal.
    uint256 public constant EARLY_WINDOW = 7 days;
    /// @notice 10% principal penalty for unstaking inside EARLY_WINDOW.
    uint256 public constant EARLY_PENALTY_BPS = 1_000;
    /// @notice Hard upper bound on any plan's APR (50%).
    uint256 public constant MAX_APR_BPS = 5_000;
    uint256 public constant MIN_DURATION = 1 days;
    uint256 public constant MAX_DURATION = 730 days;
    uint256 public constant MAX_PLANS = 10;
    /// @notice Max concurrent open positions per wallet. Closed positions do not count toward this cap.
    uint256 public constant MAX_OPEN_POSITIONS_PER_USER = 100;

    // ------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------

    IERC20 public immutable stakingToken;

    Plan[] private _plans;
    mapping(address => Position[]) private _positions;
    mapping(address => uint256) public openPositionCount;

    uint256 public minStake;
    /// @notice Max principal per position. 0 = no limit.
    uint256 public maxStake;

    /// @notice Principal currently locked in open positions.
    uint256 public totalStaked;
    /// @notice Rewards promised to open positions and not yet paid.
    uint256 public totalReserved;
    /// @notice Lifetime rewards paid out.
    uint256 public totalRewardsPaid;
    /// @notice Lifetime early-unlock penalties collected (recycled into the reward pool).
    uint256 public totalPenalties;
    /// @notice Wallets with at least one open position.
    uint256 public activeStakers;

    // ------------------------------------------------------------------
    // Events
    // ------------------------------------------------------------------

    event Staked(
        address indexed user,
        uint256 indexed positionId,
        uint8 indexed planId,
        uint256 amount,
        uint256 reward,
        uint64 end
    );
    event Unstaked(
        address indexed user,
        uint256 indexed positionId,
        uint256 principalReturned,
        uint256 rewardPaid,
        uint256 penalty,
        bool matured
    );
    event PlanAdded(uint8 indexed planId, uint64 duration, uint16 aprBps);
    event PlanUpdated(uint8 indexed planId, uint16 aprBps, bool active);
    event StakeLimitsUpdated(uint256 minStake, uint256 maxStake);
    event RewardsFunded(address indexed from, uint256 amount);
    event ExcessRewardsWithdrawn(address indexed to, uint256 amount);

    // ------------------------------------------------------------------
    // Errors
    // ------------------------------------------------------------------

    error ZeroAddress();
    error ZeroAmount();
    error InvalidPlan();
    error PlanInactive();
    error InvalidPlanParams();
    error TooManyPlans();
    error BelowMinStake();
    error AboveMaxStake();
    error InvalidLimits();
    error TooManyPositions();
    error InsufficientRewardPool(uint256 required, uint256 available);
    error UnsupportedToken();
    error InvalidPosition();
    error AlreadyClosed();
    error ExceedsExcess(uint256 requested, uint256 available);
    error OwnershipCannotBeRenounced();

    // ------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------

    /// @param token_      DOM token address.
    /// @param owner_      Admin (should be the Staking Reward multisig).
    /// @param minStake_   Minimum principal per position (token wei).
    /// @param maxStake_   Maximum principal per position (token wei), 0 = unlimited.
    /// @param durations   Initial plan durations (seconds).
    /// @param aprs        Initial plan APRs (basis points).
    constructor(
        IERC20 token_,
        address owner_,
        uint256 minStake_,
        uint256 maxStake_,
        uint64[] memory durations,
        uint16[] memory aprs
    ) Ownable(owner_) {
        if (address(token_) == address(0)) revert ZeroAddress();
        if (durations.length == 0 || durations.length != aprs.length) revert InvalidPlanParams();
        stakingToken = token_;
        _setStakeLimits(minStake_, maxStake_);
        for (uint256 i = 0; i < durations.length; i++) {
            _addPlan(durations[i], aprs[i]);
        }
    }

    // ------------------------------------------------------------------
    // User actions
    // ------------------------------------------------------------------

    /// @notice Stake `amount` DOM into plan `planId`. Requires prior ERC-20 approval.
    /// @return positionId Index of the new position in `getPositions(msg.sender)`.
    function stake(uint256 amount, uint8 planId)
        external
        nonReentrant
        whenNotPaused
        returns (uint256 positionId)
    {
        if (planId >= _plans.length) revert InvalidPlan();
        Plan memory plan = _plans[planId];
        if (!plan.active) revert PlanInactive();
        if (amount < minStake || amount == 0) revert BelowMinStake();
        if (maxStake != 0 && amount > maxStake) revert AboveMaxStake();
        if (openPositionCount[msg.sender] >= MAX_OPEN_POSITIONS_PER_USER) revert TooManyPositions();

        uint256 reward = _reward(amount, plan.aprBps, plan.duration);
        uint256 available = rewardPool();
        if (reward > available) revert InsufficientRewardPool(reward, available);

        uint256 balanceBefore = stakingToken.balanceOf(address(this));
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        if (stakingToken.balanceOf(address(this)) - balanceBefore != amount) revert UnsupportedToken();

        uint64 start = uint64(block.timestamp);
        uint64 end = start + plan.duration;

        positionId = _positions[msg.sender].length;
        _positions[msg.sender].push(
            Position({
                amount: SafeCast.toUint128(amount),
                reward: SafeCast.toUint128(reward),
                start: start,
                end: end,
                planId: planId,
                closed: false
            })
        );

        if (openPositionCount[msg.sender]++ == 0) activeStakers++;
        totalStaked += amount;
        totalReserved += reward;

        emit Staked(msg.sender, positionId, planId, amount, reward, end);
    }

    /// @notice Close a position. Full reward at/after maturity; see contract notes for early exit.
    function unstake(uint256 positionId) external nonReentrant {
        Position[] storage list = _positions[msg.sender];
        if (positionId >= list.length) revert InvalidPosition();
        Position storage p = list[positionId];
        if (p.closed) revert AlreadyClosed();

        (uint256 principalOut, uint256 rewardOut, uint256 penalty, bool matured) = _exitQuote(p);

        p.closed = true;
        if (--openPositionCount[msg.sender] == 0) activeStakers--;
        totalStaked -= p.amount;
        totalReserved -= p.reward; // forfeited rewards return to the pool automatically
        if (rewardOut > 0) totalRewardsPaid += rewardOut;
        if (penalty > 0) totalPenalties += penalty;

        stakingToken.safeTransfer(msg.sender, principalOut + rewardOut);

        emit Unstaked(msg.sender, positionId, principalOut, rewardOut, penalty, matured);
    }

    /// @notice Convenience: transfer DOM into the reward pool (requires approval).
    ///         Plain ERC-20 transfers to this contract also fund the pool.
    function fundRewards(uint256 amount) external nonReentrant {
        if (amount == 0) revert ZeroAmount();
        uint256 balanceBefore = stakingToken.balanceOf(address(this));
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = stakingToken.balanceOf(address(this)) - balanceBefore;
        if (received != amount) revert UnsupportedToken();
        emit RewardsFunded(msg.sender, received);
    }

    // ------------------------------------------------------------------
    // Views
    // ------------------------------------------------------------------

    /// @notice DOM available to back new stakes' rewards (balance minus principal and reservations).
    function rewardPool() public view returns (uint256) {
        uint256 bal = stakingToken.balanceOf(address(this));
        uint256 locked = totalStaked + totalReserved;
        return bal > locked ? bal - locked : 0;
    }

    function planCount() external view returns (uint256) {
        return _plans.length;
    }

    function getPlans() external view returns (Plan[] memory) {
        return _plans;
    }

    function positionCount(address user) external view returns (uint256) {
        return _positions[user].length;
    }

    function getPositions(address user) external view returns (Position[] memory) {
        return _positions[user];
    }

    /// @notice Paginated slice of `user`'s positions `[offset, offset + limit)`.
    function getPositionsSlice(address user, uint256 offset, uint256 limit)
        external
        view
        returns (Position[] memory slice)
    {
        Position[] storage list = _positions[user];
        uint256 len = list.length;
        if (offset >= len || limit == 0) return new Position[](0);
        uint256 end = offset + limit;
        if (end > len) end = len;
        uint256 count = end - offset;
        slice = new Position[](count);
        for (uint256 i = 0; i < count; i++) {
            slice[i] = list[offset + i];
        }
    }

    /// @notice Reward a new stake of `amount` in `planId` would earn at maturity.
    function quoteReward(uint256 amount, uint8 planId) external view returns (uint256) {
        if (planId >= _plans.length) revert InvalidPlan();
        Plan memory plan = _plans[planId];
        return _reward(amount, plan.aprBps, plan.duration);
    }

    /// @notice What `user` would receive by unstaking `positionId` right now.
    function previewUnstake(address user, uint256 positionId)
        external
        view
        returns (uint256 principalOut, uint256 rewardOut, uint256 penalty, bool matured)
    {
        Position[] storage list = _positions[user];
        if (positionId >= list.length) revert InvalidPosition();
        Position storage p = list[positionId];
        if (p.closed) revert AlreadyClosed();
        return _exitQuote(p);
    }

    /// @notice All headline numbers in one call (for the website).
    function stats()
        external
        view
        returns (
            uint256 totalStaked_,
            uint256 totalReserved_,
            uint256 rewardPool_,
            uint256 totalRewardsPaid_,
            uint256 totalPenalties_,
            uint256 activeStakers_,
            uint256 minStake_,
            uint256 maxStake_,
            bool paused_
        )
    {
        return (
            totalStaked,
            totalReserved,
            rewardPool(),
            totalRewardsPaid,
            totalPenalties,
            activeStakers,
            minStake,
            maxStake,
            paused()
        );
    }

    // ------------------------------------------------------------------
    // Admin
    // ------------------------------------------------------------------

    function addPlan(uint64 duration, uint16 aprBps) external onlyOwner {
        _addPlan(duration, aprBps);
    }

    /// @notice Change a plan's APR / availability. Only affects NEW stakes.
    function updatePlan(uint8 planId, uint16 aprBps, bool active) external onlyOwner {
        if (planId >= _plans.length) revert InvalidPlan();
        if (aprBps == 0 || aprBps > MAX_APR_BPS) revert InvalidPlanParams();
        _plans[planId].aprBps = aprBps;
        _plans[planId].active = active;
        emit PlanUpdated(planId, aprBps, active);
    }

    function setStakeLimits(uint256 minStake_, uint256 maxStake_) external onlyOwner {
        _setStakeLimits(minStake_, maxStake_);
    }

    /// @notice Block new stakes. Unstaking is never blocked.
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Withdraw unreserved reward-pool DOM. Can never touch principal or reserved rewards.
    function withdrawExcessRewards(address to, uint256 amount) external onlyOwner nonReentrant {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        uint256 available = rewardPool();
        if (amount > available) revert ExceedsExcess(amount, available);
        stakingToken.safeTransfer(to, amount);
        emit ExcessRewardsWithdrawn(to, amount);
    }

    /// @notice Rescue tokens other than DOM sent here by mistake.
    function recoverERC20(IERC20 token, address to, uint256 amount) external onlyOwner nonReentrant {
        if (address(token) == address(stakingToken)) revert UnsupportedToken();
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        token.safeTransfer(to, amount);
    }

    /// @notice Disabled to prevent accidentally locking unreserved reward pool funds forever.
    function renounceOwnership() public view override onlyOwner {
        revert OwnershipCannotBeRenounced();
    }

    // ------------------------------------------------------------------
    // Internal
    // ------------------------------------------------------------------

    function _reward(uint256 amount, uint256 aprBps, uint256 duration) internal pure returns (uint256) {
        return (amount * aprBps * duration) / (BPS * YEAR);
    }

    function _exitQuote(Position storage p)
        internal
        view
        returns (uint256 principalOut, uint256 rewardOut, uint256 penalty, bool matured)
    {
        matured = block.timestamp >= p.end;
        if (matured) {
            return (p.amount, p.reward, 0, true);
        }
        if (block.timestamp < uint256(p.start) + EARLY_WINDOW) {
            penalty = (uint256(p.amount) * EARLY_PENALTY_BPS) / BPS;
        }
        principalOut = uint256(p.amount) - penalty;
        rewardOut = 0;
    }

    function _addPlan(uint64 duration, uint16 aprBps) internal {
        if (_plans.length >= MAX_PLANS) revert TooManyPlans();
        if (duration < MIN_DURATION || duration > MAX_DURATION) revert InvalidPlanParams();
        if (aprBps == 0 || aprBps > MAX_APR_BPS) revert InvalidPlanParams();
        _plans.push(Plan({duration: duration, aprBps: aprBps, active: true}));
        emit PlanAdded(uint8(_plans.length - 1), duration, aprBps);
    }

    function _setStakeLimits(uint256 minStake_, uint256 maxStake_) internal {
        if (minStake_ == 0) revert InvalidLimits();
        if (maxStake_ != 0 && maxStake_ < minStake_) revert InvalidLimits();
        minStake = minStake_;
        maxStake = maxStake_;
        emit StakeLimitsUpdated(minStake_, maxStake_);
    }
}
