import { getCryptoDetails } from "@/utils/getCryptoDetails";

export default async function CryptoPage({
  params,
}: {
  params: { id: string };
}) {
  const coinDetails = await getCryptoDetails(params.id);
  return <div>{JSON.stringify(coinDetails)}</div>;
}
