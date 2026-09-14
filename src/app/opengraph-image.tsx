import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A1020 0%, #10182B 55%, #161D31 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(244,181,68,0.22), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 999,
            border: "1px solid rgba(244,181,68,0.35)",
            color: "#F4B544",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          Telegram Mini App · Idle Mining
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#F5F5F5",
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          Dungeon of Miners
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#FFCC4D",
            marginTop: 28,
            textAlign: "center",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 44,
            fontSize: 22,
            color: "#A9B0BC",
            letterSpacing: 2,
          }}
        >
          dungeonofminers.com
        </div>
      </div>
    ),
    { ...size }
  );
}
