import { Table } from "@/components/table";
import { TrendingCoins } from "@/components/trending-coins";
import { TodayInfo } from "@/components/today-info";
import { getCryptoData } from "@/utils/getCryptoData";

export default async function Home() {
  const data = await getCryptoData();

  return (
    <main>
      {/* @ts-expect-error Async Server Component */}
      <TodayInfo />
      {/* @ts-expect-error Async Server Component */}
      <TrendingCoins />
      <Table cryptoData={data} />
    </main>
  );
}
