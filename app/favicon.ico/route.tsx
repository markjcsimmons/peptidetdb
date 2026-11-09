import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/**
 * /favicon.ico for crawlers and older browsers that ask for it before (or instead of) the <link rel="icon">
 * in app/icon.svg. Draws the same logo mark as a 32x32 PNG and wraps it in an ICO container, so there is
 * no binary file to keep in the repo.
 */
export async function GET() {
  const png = Buffer.from(
    await new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", background: "#f6f7f3", borderRadius: 8 }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <path d="M8 21 L16 10 L24 21" stroke="#1f6f5c" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
            <circle cx="8" cy="21" r="5" fill="#1f6f5c" />
            <circle cx="16" cy="10" r="5" fill="#3e8f7a" />
            <circle cx="24" cy="21" r="5" fill="#b7731a" />
          </svg>
        </div>
      ),
      { width: 32, height: 32 },
    ).arrayBuffer(),
  );

  // ICO: 6-byte header, one 16-byte directory entry, then the PNG data (supported by every current browser).
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette colours
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset

  return new Response(Buffer.concat([header, png]), {
    headers: {
      "content-type": "image/x-icon",
      "cache-control": "public, max-age=86400",
    },
  });
}
