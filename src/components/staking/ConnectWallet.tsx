"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain, type Connector } from "wagmi";
import QRCode from "qrcode";
import {
  Wallet,
  LogOut,
  ChevronDown,
  X,
  Copy,
  Check,
  ArrowLeftRight,
  PlusCircle,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  QrCode,
  RefreshCw,
} from "lucide-react";
import { DOM_TOKEN_ADDRESS, stakingChain } from "@/lib/wagmi";
import { cn } from "@/lib/utils";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>;
};

async function watchDomAsset(connector?: Connector): Promise<boolean> {
  try {
    let provider: Eip1193Provider | undefined;
    if (connector && typeof connector.getProvider === "function") {
      provider = (await connector.getProvider()) as Eip1193Provider | undefined;
    }
    if (!provider && typeof window !== "undefined") {
      provider = (window as unknown as { ethereum?: Eip1193Provider }).ethereum;
    }
    if (!provider?.request) return false;

    const image =
      typeof window !== "undefined"
        ? `${window.location.origin}/assets/logo-dragon-coin.png`
        : undefined;

    await provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: DOM_TOKEN_ADDRESS,
          symbol: "DOM",
          decimals: 18,
          ...(image ? { image } : {}),
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}

export function AddDomToWalletButton({ className }: { className?: string }) {
  const { connector, isConnected } = useAccount();
  const [added, setAdded] = useState(false);

  const onAdd = async () => {
    const ok = await watchDomAsset(connector);
    if (ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!isConnected) return null;

  return (
    <button
      type="button"
      onClick={onAdd}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-ink-muted transition-colors hover:border-gold/30 hover:text-gold",
        className
      )}
    >
      {added ? (
        <>
          <Check className="h-4 w-4 text-emerald-glow" />
          <span className="text-emerald-glow">DOM Added</span>
        </>
      ) : (
        <>
          <PlusCircle className="h-4 w-4 text-gold" />
          Add DOM to Wallet
        </>
      )}
    </button>
  );
}

type WalletOption = {
  key: string;
  connector: Connector;
  name: string;
  desc: string;
  badge?: string;
  logo: ReactNode;
};

function buildWalletOptions(connectors: readonly Connector[]): WalletOption[] {
  const list: WalletOption[] = [];

  // Prefer a dedicated EIP-6963 MetaMask connector if present, otherwise fall back to `injected`.
  const eip6963MetaMask = connectors.find(
    (c) => c.id === "io.metamask" || c.id === "metaMask" || /metamask/i.test(c.name)
  );
  const genericInjected = connectors.find((c) => c.id === "injected");
  const primaryInjected = eip6963MetaMask ?? genericInjected;

  if (primaryInjected) {
    list.push({
      key: "metamask",
      connector: primaryInjected,
      name: "MetaMask",
      desc: "Connect browser extension wallet",
      badge: "Popular",
      logo: <img src="/assets/metamask.svg" alt="MetaMask" className="h-8 w-8 object-contain" />,
    });
  }

  // Also include any other detected EIP-6963 browser wallets (Trust, Rabby, OKX, Brave, etc.)
  for (const c of connectors) {
    if (
      c.id !== "injected" &&
      c.id !== "walletConnect" &&
      c !== primaryInjected
    ) {
      list.push({
        key: c.id,
        connector: c,
        name: c.name,
        desc: "Detected browser wallet",
        logo: c.icon ? (
          <img src={c.icon} alt={c.name} className="h-8 w-8 rounded-full object-contain" />
        ) : (
          <Wallet className="h-6 w-6 text-gold" />
        ),
      });
    }
  }

  const wc = connectors.find((c) => c.id === "walletConnect");
  if (wc) {
    list.push({
      key: "walletConnect",
      connector: wc,
      name: "WalletConnect",
      desc: "Scan QR code with any mobile wallet",
      logo: (
        <img
          src="/assets/walletconnect.svg"
          alt="WalletConnect"
          className="h-8 w-8 object-contain"
        />
      ),
    });
  }

  return list;
}

export function ConnectWallet({ className }: { className?: string }) {
  const { address, isConnected, connector } = useAccount();
  const { connectors, connectAsync, reset } = useConnect();
  const { disconnect, disconnectAsync } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [open, setOpen] = useState(false);
  const [connectingKey, setConnectingKey] = useState<string | null>(null);
  const [connectError, setConnectError] = useState<string | null>(null);

  // Built-in WalletConnect QR state
  const [wcView, setWcView] = useState(false);
  const [wcUri, setWcUri] = useState<string | null>(null);
  const [wcQrDataUrl, setWcQrDataUrl] = useState<string | null>(null);
  const [wcCopied, setWcCopied] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tokenAdded, setTokenAdded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setWcView(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (isConnected) {
      setOpen(false);
      setWcView(false);
      setConnectingKey(null);
      setConnectError(null);
    }
  }, [isConnected]);

  const options = buildWalletOptions(connectors);

  const startWalletConnect = async (c: Connector) => {
    setConnectError(null);
    setWcView(true);
    setWcUri(null);
    setWcQrDataUrl(null);
    setConnectingKey("walletConnect");
    reset();

    const onMessage = async (msg: { type: string; data?: unknown }) => {
      if (msg.type === "display_uri" && typeof msg.data === "string") {
        setWcUri(msg.data);
        try {
          const dataUrl = await QRCode.toDataURL(msg.data, {
            width: 260,
            margin: 1,
            color: { dark: "#0A0C0F", light: "#FFFFFF" },
          });
          setWcQrDataUrl(dataUrl);
        } catch {
          /* ignore QR render failure; URI copy still works */
        }
      }
    };

    c.emitter.on("message", onMessage);

    try {
      // Also attach directly to the underlying provider in case display_uri fires there
      const provider = (await c.getProvider().catch(() => null)) as
        | { on?: (ev: string, fn: (uri: string) => void) => void; removeListener?: (ev: string, fn: (uri: string) => void) => void }
        | null;
      const onProviderUri = (uri: string) => onMessage({ type: "display_uri", data: uri });
      provider?.on?.("display_uri", onProviderUri);

      try {
        await connectAsync({ connector: c });
        setOpen(false);
        setWcView(false);
      } finally {
        provider?.removeListener?.("display_uri", onProviderUri);
      }
    } catch (err) {
      const e = err as { shortMessage?: string; message?: string };
      const msg = `${e?.shortMessage ?? ""} ${e?.message ?? ""}`;
      if (/User rejected|User denied|rejected the request|reset/i.test(msg)) {
        setConnectError("Connection request was cancelled or expired. Click Retry to generate a new QR code.");
      } else {
        setConnectError(e?.shortMessage || e?.message || "Failed to connect via WalletConnect.");
      }
    } finally {
      c.emitter.off("message", onMessage);
      setConnectingKey(null);
    }
  };

  const handleSelectOption = async (opt: WalletOption) => {
    setConnectError(null);
    reset();

    if (opt.connector.id === "walletConnect") {
      await startWalletConnect(opt.connector);
      return;
    }

    // Browser extension wallet (MetaMask / Injected)
    const winEth =
      typeof window !== "undefined"
        ? (window as unknown as { ethereum?: Eip1193Provider }).ethereum
        : undefined;

    if (opt.connector.id === "injected" && !winEth) {
      setConnectError(
        "No browser wallet extension detected (e.g. MetaMask). Install MetaMask or choose WalletConnect below to scan with your phone."
      );
      return;
    }

    setConnectingKey(opt.key);
    try {
      const res = await connectAsync({ connector: opt.connector });
      if (res.chainId !== stakingChain.id) {
        try {
          switchChain({ chainId: stakingChain.id });
        } catch {
          /* user can switch network later via the StakePanel button */
        }
      }
      setOpen(false);
    } catch (err) {
      const e = err as { shortMessage?: string; message?: string };
      const msg = `${e?.shortMessage ?? ""} ${e?.message ?? ""}`;
      if (/User rejected|User denied|rejected the request/i.test(msg)) {
        setConnectError("Connection rejected in your wallet extension.");
      } else if (/already pending/i.test(msg)) {
        setConnectError("A connection request is already open in your wallet extension. Click the MetaMask icon in your browser toolbar.");
      } else {
        setConnectError(e?.shortMessage || e?.message || "Failed to connect browser wallet.");
      }
    } finally {
      setConnectingKey(null);
    }
  };

  const copyWcUri = async () => {
    if (!wcUri) return;
    try {
      await navigator.clipboard.writeText(wcUri);
      setWcCopied(true);
      setTimeout(() => setWcCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const addToken = async () => {
    const ok = await watchDomAsset(connector);
    if (ok) {
      setTokenAdded(true);
      setTimeout(() => setTokenAdded(false), 1800);
    }
  };

  const changeWallet = async () => {
    setMenuOpen(false);
    await disconnectAsync();
    setConnectError(null);
    setWcView(false);
    setOpen(true);
  };

  if (isConnected && address) {
    return (
      <div ref={menuRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-glow/30 bg-emerald-glow/10 px-4 py-3 text-sm font-semibold text-emerald-glow transition-colors hover:bg-emerald-glow/20",
            className?.includes("w-full") && "w-full"
          )}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-glow" />
          <Wallet className="h-4 w-4" />
          {shortAddress(address)}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menuOpen && "rotate-180")} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full z-[110] mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-void-100 p-1.5 shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <span className="truncate font-mono text-xs text-ink-muted">{address}</span>
              <button
                type="button"
                onClick={copyAddress}
                className="shrink-0 rounded-lg border border-white/10 p-1.5 text-ink-faint transition-colors hover:text-ink"
                aria-label="Copy address"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-glow" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="my-1 h-px bg-white/[0.06]" />
            <button
              type="button"
              onClick={addToken}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-gold"
            >
              {tokenAdded ? (
                <>
                  <Check className="h-4 w-4 text-emerald-glow" />
                  <span className="text-emerald-glow">Added to Wallet</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  Add DOM to Wallet
                </>
              )}
            </button>
            <button
              type="button"
              onClick={changeWallet}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Change Wallet
            </button>
            <button
              type="button"
              onClick={() => {
                disconnect();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-torch"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  const wcConnector = connectors.find((c) => c.id === "walletConnect");

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setConnectError(null);
          setConnectingKey(null);
          setWcView(false);
          setOpen(true);
        }}
        className={cn("btn-primary", className)}
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setWcView(false);
            }}
            aria-hidden
          />

          <div className="surface-panel relative z-10 w-full max-w-sm p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {wcView && (
                  <button
                    type="button"
                    onClick={() => {
                      setWcView(false);
                      setConnectError(null);
                      setConnectingKey(null);
                    }}
                    aria-label="Back to wallet list"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink-faint transition-colors hover:border-gold/30 hover:text-ink"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <h3 className="heading-md text-lg">
                    {wcView ? "Scan with Mobile Wallet" : "Connect Wallet"}
                  </h3>
                  <p className="mt-0.5 text-xs text-ink-faint">
                    {wcView
                      ? "Open MetaMask, Trust Wallet, SafePal, or Binance Wallet and scan"
                      : `Choose a wallet to connect to ${stakingChain.name}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setWcView(false);
                }}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-ink-faint transition-colors hover:border-gold/30 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {wcView ? (
              <div className="mt-5 flex flex-col items-center">
                <div className="flex h-[276px] w-[276px] items-center justify-center rounded-2xl border border-gold/30 bg-white p-3 shadow-glow-gold">
                  {wcQrDataUrl ? (
                    <img
                      src={wcQrDataUrl}
                      alt="WalletConnect QR Code"
                      className="h-[252px] w-[252px] rounded-lg object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 px-4 text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                      <p className="text-xs font-semibold text-neutral-700">
                        Generating WalletConnect QR code…
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex w-full gap-2">
                  <button
                    type="button"
                    disabled={!wcUri}
                    onClick={copyWcUri}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-ink-muted transition-colors hover:border-gold/30 hover:text-gold disabled:opacity-40"
                  >
                    {wcCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-glow" />
                        <span className="text-emerald-glow">Pairing Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Pairing Link
                      </>
                    )}
                  </button>
                  {wcConnector && (
                    <button
                      type="button"
                      onClick={() => startWalletConnect(wcConnector)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-ink-muted transition-colors hover:border-gold/30 hover:text-gold"
                      title="Generate new QR code"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Retry
                    </button>
                  )}
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-center text-[11px] text-ink-faint">
                  <QrCode className="h-3.5 w-3.5 text-gold" />
                  Waiting for approval in your wallet app…
                </p>
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-2.5">
                {options.map((o) => {
                  const isThisConnecting = connectingKey === o.key;
                  return (
                    <button
                      key={o.key}
                      type="button"
                      disabled={connectingKey !== null}
                      onClick={() => handleSelectOption(o)}
                      className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-left transition-colors hover:border-gold/30 hover:bg-white/[0.05] disabled:opacity-60"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                        {o.logo}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-ink">{o.name}</span>
                          {o.badge && (
                            <span className="rounded-full border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold">
                              {o.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-ink-faint">
                          {isThisConnecting ? "Opening wallet…" : o.desc}
                        </span>
                      </span>
                      {isThisConnecting ? (
                        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-gold" />
                      ) : (
                        <span className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-gold">
                          →
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {connectError && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-torch/30 bg-torch/10 p-3 text-xs text-torch">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{connectError}</span>
              </div>
            )}

            <p className="mt-5 border-t border-white/[0.06] pt-4 text-center text-[11px] leading-relaxed text-ink-faint">
              By connecting, you agree to the{" "}
              <a href="/terms" className="text-gold underline-offset-4 hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}
