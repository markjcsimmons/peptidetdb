import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social-share card for every page. Built at build time; colours match the light theme tokens. */
export default function OpenGraphImage() {
  const beads = [
    [0, 120, "#1f6f5c"],
    [1, 156, "#3e8f7a"],
    [2, 180, "#1f6f5c"],
    [3, 190, "#3e8f7a"],
    [4, 178, "#1f6f5c"],
    [5, 148, "#3e8f7a"],
    [6, 112, "#1f6f5c"],
    [7, 80, "#b7731a"],
    [8, 60, "#1f6f5c"],
    [9, 62, "#3e8f7a"],
    [10, 84, "#1f6f5c"],
    [11, 118, "#3e8f7a"],
    [12, 150, "#1f6f5c"],
    [13, 176, "#3e8f7a"],
    [14, 190, "#1f6f5c"],
  ] as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f7f3",
          color: "#14181f",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: "#1f6f5c", textTransform: "uppercase" }}>
            {SITE.fullName}
          </div>
          <div style={{ marginTop: 24, fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            Peptides, explained by the evidence
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#3a4352", maxWidth: 860 }}>{SITE.tagline}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", position: "relative", width: 640, height: 230 }}>
            {beads.map(([i, y, c]) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: i * 42,
                  top: y,
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  background: c,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: "#14181f" }}>{SITE.name}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
