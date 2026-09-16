import { ImageResponse } from "next/og";

export const alt = "Sri Vigneshwara Packaging — Corrugated packaging, Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f5f1e8", color: "#191817", padding: "64px", borderBottom: "20px solid #a66b3d" }}>
      <div style={{ display: "flex", fontSize: 25, letterSpacing: 4 }}>SRI VIGNESHWARA PACKAGING</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 1.05 }}><span>Corrugated packaging.</span><span>Built for the journey.</span></div>
      <div style={{ display: "flex", fontSize: 24, color: "#88582f" }}>3, 5 & 7-ply boxes · Custom die-cut packaging · Bengaluru</div>
    </div>, size,
  );
}
