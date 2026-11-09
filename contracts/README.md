# DomStaking — Fixed-Term DOM Staking Contract

Smart contract dan unit test untuk fitur staking **Dungeon of Miners (DOM)** di BNB Smart Chain.

## Ringkasan Kontrak (`contracts/DomStaking.sol`)

- **Compiler:** Solidity `0.8.26`, optimizer `runs: 200`, `evmVersion: paris`, OpenZeppelin `5.6.1`.
- **Tier bawaan (`scripts/deploy.cjs`):**
  - Tier 0 (`Shallow Vein`): **30 hari — 6% APR** (`600` bps)
  - Tier 1 (`Deep Vein`): **90 hari — 12% APR** (`1200` bps)
  - Tier 2 (`Abyssal Vein`): **180 hari — 20% APR** (`2000` bps)
- **Rumus reward (simple APR):**
  $$\text{reward} = \frac{\text{amount} \times \text{aprBps} \times \text{duration}}{10\,000 \times 365\text{ days}}$$
- **Upfront reservation:** Setiap kali `stake()` dipanggil, seluruh `reward` langsung dikunci di `totalReserved`. Bila `reward > rewardPool()`, transaksi revert dengan `InsufficientRewardPool`.
- **Aturan `unstake(positionId)`:**
  - Saat/setelah jatuh tempo (`block.timestamp >= end`): pengguna menerima `100% pokok + 100% reward`.
  - Sebelum jatuh tempo dalam `< 7 hari` pertama: penalti `10%` dari pokok + reward hangus (keduanya kembali ke `rewardPool`).
  - Sebelum jatuh tempo setelah `>= 7 hari`: penalti pokok `0%` (pokok kembali 100%), reward hangus kembali ke `rewardPool`.
- **Keamanan dana pengguna:**
  - Owner (`Ownable2Step`, dipegang oleh Safe `Staking Reward`) hanya dapat menarik `rewardPool()` yang **belum terpakai** lewat `withdrawExcessRewards`. Pokok staker (`totalStaked`) dan reward yang sedang di-reserve (`totalReserved`) tidak pernah bisa ditarik oleh owner.
  - `pause()` hanya menghentikan `stake()` baru; `unstake()` tetap bisa dipanggil kapan pun.

## Perintah

```bash
cd contracts
npm test              # kompilasi + jalankan 16 unit test Hardhat
npm run export-abi    # perbarui ../src/lib/stakingAbi.ts dari artefak kompilasi
```

## Gladi Resik Deploy (Nanti Saat Siap Tayang)

1. Salin `.env.deploy.example` menjadi `.env.deploy` (sudah di-gitignore) dan isi melalui editor:
   - `DEPLOY_PRIVATE_KEY`
   - `STAKING_TOKEN_ADDRESS` (`0xEb256a0F0d028a3EA698624e47Ed94f9Ce8c06EF` untuk tDOM testnet, `0xB33A511B88b6691bE265DdBCD0c8dbE6A4fCf515` untuk DOM mainnet)
   - `STAKING_OWNER_ADDRESS` (`0x10ADfD32f15778a9F2CA09662e34074D79F3C62B` — Staking Reward Safe)
2. Deploy:
   ```bash
   npm run deploy:testnet   # BSC Testnet (chain 97)
   # atau
   npm run deploy:mainnet   # BSC Mainnet (chain 56)
   ```
3. Isi reward pool dengan mengirim DOM dari Safe ke alamat kontrak `DomStaking` (transfer ERC-20 biasa atau `fundRewards`).
4. Isi `NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS` di `.env.local` / environment hosting untuk mengaktifkan tombol transaksi di `/staking`.
