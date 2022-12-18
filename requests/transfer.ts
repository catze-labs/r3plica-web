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

      return data;
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
    (payload: Transfer.Payload) => transfer(payload),
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
      refetchInterval: 3000,
    }
  );

  return { data, isLoading, error };
}
