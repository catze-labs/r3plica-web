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

  return { transfer };
};

export function useTransfer(
  onSuccess?: (data: Transfer.Response) => void,
  onError?: (error: ServerError) => void
) {
  const { transfer } = useTransferAPI();

  const { mutate, isLoading } = useMutation(
    (payload: Transfer.Payload) => transfer(payload),
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading };
}
