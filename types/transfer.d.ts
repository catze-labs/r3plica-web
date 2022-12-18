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

interface entitlementTransferHistoryItem {
  id: number;
  txHash: string;
  entitlement: unknown;
  playFabId: string;
  tokenId: string;
  contractAddress: string;
  created: string;
  updated: string;
}

interface HistoryList {
  itemTransfers: ItemTransferHistoryItem[];
  entitlementTransfers;
}

declare namespace Transfer {
  type Payload = TransferPayload;
  type Response = TransferResponse;
}
