import { useSession } from "@/states/session";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import client from "./client";

export const useTransferAPI = () => {
  const transfer = async (payload: Transfer.Payload) => {
    try {
      const { data } = await client.post<Transfer.Response>(
        "/transfer",
        payload
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
    }
  };

  const fetchTransferHistory = async (sessionTicket: string) => {
    try {
      const { data } = await client.get<Transfer.HistoryList>(
        "/transfer-history",
        {
          params: {
            sessionTicket,
          },
        }
      );

      // return data;

      return {
        profileTransfers: [
          {
            id: 4,
            txHash:
              "0xfc6c402918670a22399a2c149e493fb13941b4c524381109b8614a8193cf1d3f",
            txStatus: true,
            playFabId: "CCE2C4C9324BE60D",
            contractAddress: "0xE40495B6e4a0f19BF40F990320DD68CA7423e7D5",
            // created: "2022-12-27T12:19:20.920Z",
            // updated: "2022-12-27T12:21:00.540Z",
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
          },
        ],
        itemTransfers: [
          {
            id: 4,
            txHash:
              "0xfa765e36c4456f6c1f990ee9aad890e102bc04862300720da995d96258a57847",
            txStatus: true,
            playFabId: "CCE2C4C9324BE60D",
            contractAddress: "0xE40495B6e4a0f19BF40F990320DD68CA7423e7D5",
            // created: "2022-12-27T12:19:20.920Z",
            // updated: "2022-12-27T12:21:00.540Z",
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            item: {},
            tokenId: "1",
          },
        ],
        achievementTransfers: [
          {
            id: 4,
            txHash:
              "0xec15cfc5e5e24fc371a5cf7d42dc9e1a41a53da14a8aa4ef4c24e616848e0d5d",
            txStatus: true,
            playFabId: "CCE2C4C9324BE60D",
            contractAddress: "0xE40495B6e4a0f19BF40F990320DD68CA7423e7D5",
            created: "2022-12-27T12:19:20.920Z",
            updated: "2022-12-27T12:21:00.540Z",
            achievement: {},
            tokenId: "1",
          },
        ],
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
    }
  };

  return { transfer, fetchTransferHistory };
};

export function useTransfer(
  onSuccess?: (data: Transfer.Response) => void,
  onError?: (error: ServerError) => void
) {
  const { transfer } = useTransferAPI();

  const { mutate, isLoading } = useMutation(
    "transfer",
    (payload: Transfer.Payload) =>
      transfer(payload) as Promise<Transfer.Response>,
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading };
}

export function useTransferHistory() {
  const { session } = useSession();
  const { fetchTransferHistory } = useTransferAPI();

  const { data, isLoading, error } = useQuery(
    ["transfer", "history", session],
    () => fetchTransferHistory(session?.sessionTicket ?? ""),
    {
      enabled: !!session?.sessionTicket,
      // refetchInterval: 3000,
    }
  );

  return { data, isLoading, error };
}
