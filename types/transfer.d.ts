interface TransferPayload {
  sessionTicket: string;
  itemIds: number[];
  achievementIds: number[];
}

type TransferResponse = {
  achievementTxHash: string;
  itemTxHash: string;
};

interface ItemTransferHistoryItem {
  id: number;
  txHash: string;
  itemId: unknown;
  playFabId: string;
  tokenId: string;
  contractAddress: string;
  created: string;
  updated: string;
}

interface achievementTransferHistoryItem {
  id: number;
  txHash: string;
  achievement: unknown;
  playFabId: string;
  tokenId: string;
  contractAddress: string;
  created: string;
  updated: string;
}

interface TxHistory {
  id: number;
  txHash: string;
  playFabId: string;
  tokenId: string;
  contractAddress: string;
  created: string;
  updated: string;
  txStatus: boolean | null;
}

interface ProfileTransferHistoryItem extends TxHistory {
  profile: unknown;
}
interface ItemTransferHistoryItem extends TxHistory {
  item: unknown;
}
interface AchievementTransferHistoryItem extends TxHistory {
  achievement: unknown;
}

interface TransferHistoryList {
  profileTransfers: ProfileTransferHistoryItem[];
  itemTransfers: ItemTransferHistoryItem[];
  achievementTransfers: AchievementTransferHistoryItem[];
}

declare namespace Transfer {
  type Payload = TransferPayload;
  type Response = TransferResponse;
  type HistoryList = TransferHistoryList;
}
