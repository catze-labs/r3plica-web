import axios from "axios";
import { useQuery } from "react-query";

const IntervalFetchBscScan = async ({ txHash }: { txHash: string }) => {
  const { data } = await axios.get<{
    status: string;
    message: string;
    result: {
      status: "0" | "1" | "";
    };
  }>("/api/bscscan", {
    params: {
      txHash,
    },
  });

  return data;
};

export default function useFetchBscScanLoop(txHash: string) {
  const { data } = useQuery(
    ["bscScan", txHash],
    () => IntervalFetchBscScan({ txHash }),
    {
      refetchInterval: 1000,
    }
  );

  return { data };
}
