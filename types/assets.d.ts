interface Item {
  itemName: string;
  itemID: number;
  id: number;
  rdmItemID: number;
  state: number;
  gainDate: string;
  rarity: "epic" | "legendary";
  enchantmentID: number;
  enchantmentTierIndex: number;
  sockets: unknown[];
  isTransferred: boolean;
  transfer: {
    id: number;
    txHash: string;
    tokenId: string | null;
    contractAddress: string;
  } | null;
}

interface Entitlement {
  questID: number;
  questName: string;
  description: string;
  state: number;
  objectives: unknown[];
  isTransferred: boolean;
  transfer: {
    id: number;
    txHash: string;
    tokenId: string | null;
    contractAddress: string;
  } | null;
}

type InventoryResponse = ListResponse<Item>;

type EntitlementsResponse = ListResponse<Entitlement>;

declare namespace Assets {
  namespace Inventory {
    type Item = Item;
    type Response = InventoryResponse;
  }

  namespace Entitlements {
    type Entitlement = Entitlement;
    type Response = EntitlementsResponse;
  }
}
