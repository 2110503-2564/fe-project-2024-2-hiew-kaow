import Banner from "@/components/Banner";
import CardPanel from '../components/CardPanel';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', margin: 0, overflow: "hidden" }}>
      <Banner />
      <CardPanel />
    </main>
  );
}
