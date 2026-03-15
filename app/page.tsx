import ShareCard from "./components/ShareCard";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f5f0e8", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🪵 敲木鱼</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>积攒功德，分享好运</p>
      <ShareCard />
    </main>
  );
}
