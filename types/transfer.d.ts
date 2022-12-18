interface TransferPayload {
  sessionTicket: string;
  itemIds: number[];
  achievementIds: number[];
}

type TransferResponse = unknown;

interface ItemTransferHistoryItem {
  id: number;
  txHash: string;
  item: unknown;
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

interface HistoryList {
  itemTransfers: ItemTransferHistoryItem[];
  achievementTransfers;
}

declare namespace Transfer {
  type Payload = TransferPayload;
  type Response = TransferResponse;
}
