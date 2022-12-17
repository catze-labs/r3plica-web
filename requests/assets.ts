import { useSession } from "@/states/session";
import axios from "axios";
import { useQuery } from "react-query";
import client from "./client";

export const useAssetsAPI = () => {
  const fetchInventory = async (sessionTicket: string) => {
    try {
      const { data } = await client.get<Assets.Inventory.Response>(
        "/playfab/items",
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

  const fetchEntitlements = async (sessionTicket: string) => {
    try {
      const { data } = await client.get<Assets.Entitlements.Response>(
        "/playfab/entitlements",
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

  return {
    fetchInventory,
    fetchEntitlements,
  };
};

export function useInventory() {
  const { session } = useSession();
  const { fetchInventory } = useAssetsAPI();

  const { data, isLoading, error } = useQuery(
    ["inventory", session],
    () => fetchInventory(session?.sessionTicket ?? ""),
    {
      enabled: !!session?.sessionTicket,
    }
  );

  return {
    data,
    isLoading,
    error,
  };
}

export function useEntitlements() {
  const { session } = useSession();
  const { fetchEntitlements } = useAssetsAPI();

  const { data, isLoading, error } = useQuery(
    ["entitlements", session],
    () => fetchEntitlements(session?.sessionTicket ?? ""),
    {
      enabled: !!session?.sessionTicket,
    }
  );

  return {
    data,
    isLoading,
    error,
  };
}
