import axios from "axios";
import { useMutation } from "react-query";
import client from "./client";

export const useWalletAPI = () => {
  const generateNonce = async (payload: Wallet.Nonce.Payload) => {
    try {
      const { data } = await client.post<Wallet.Nonce.Response>(
        "/nonce",
        payload
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
    }
  };

  const link = async (payload: Wallet.Link.Payload) => {
    try {
      const { data } = await client.patch<Wallet.Link.Response>(
        "/playfab/link-wallet",
        payload
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
    }
  };

  return {
    generateNonce,
    link,
  };
};

export function useLinkWallet(
  onSuccess?: (data: Wallet.Link.Response) => void,
  onError?: (error: ServerError) => void
) {
  const { link } = useWalletAPI();

  const { mutate, isLoading, error } = useMutation(
    "linkWallet",
    (payload: Wallet.Link.Payload) =>
      link(payload) as Promise<Wallet.Link.Response>,
    {
      onSuccess,
      onError,
    }
  );

  return {
    mutate,
    isLoading,
    error,
  };
}
