interface Item {
  itemName: string;
  itemID: number;
  id: number;
  rdmItemID: number;
  state: number;
  gainDate: string;
  rarity: "Epic" | "Legendary";
  enchantmentID: number;
  enchantmentTierIndex: number;
  sockets: unknown[];
  isTransferred: boolean | null; // null: Transaction Pending, true: Transaction Sent, false Transaction Failed
  transfer: {
    id: number;
    txHash: string;
    tokenId: string | null;
    contractAddress: string;
  } | null;
  isTokenized: boolean;
}

interface Achievement {
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

type InventoryResponse = { items: Item[] };

type AchievementsResponse = { achievements: Achievement[] };

declare namespace Assets {
  namespace Inventory {
    type Item = Item;
    type Response = InventoryResponse;
  }

  namespace Achievements {
    type Achievement = Achievement;
    type Response = AchievementsResponse;
  }
}
