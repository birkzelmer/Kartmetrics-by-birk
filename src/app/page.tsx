export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <iframe
      src="/kartmetrics.html"
      title="KartMetrics"
      style={{ border: "none", width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
