import { Table } from "@/components/table";
import ThemeSwitch from "../components/theme-switch";
import z from "zod";

const cryptoDataSchema = z.array(
  z.object({
    market_cap_rank: z.number(),
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string(),
    current_price: z.number(),
  })
);

export type CryptoData = z.infer<typeof cryptoDataSchema>;

async function getCryptoData() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en",
    {next: {
      revalidate: 500
    }}
  );

  const data = await res.json();

  return cryptoDataSchema.parse(data);
}

export default async function Home() {
  const data = await getCryptoData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSwitch />
      <Table cryptoData={data} />
    </main>
  );
}
