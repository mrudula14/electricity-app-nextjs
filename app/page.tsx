import OverviewPage from "./countries/page";

export default function Home() {
  return (
    <main className="pt-20 px-20">
      <div className="text-red-500 text-2xl font-bold mb-4">
        Electricity Price App
      </div>
      <OverviewPage />
    </main>
  );
}
