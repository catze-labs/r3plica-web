import Button from "@/components/Button";
import NoSSR from "@/components/NoSSR";
import { useSession } from "@/states/session";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AssetBox from "../../../components/AssetBox";
import AssetList from "./AssetList";
import AchievementList from "./AchievementList";

interface TransferConfirmProps {
  onConfirmSuccess?: (confirmed: Transfer.Payload) => void;
}

const TransferConfirm: React.FC<TransferConfirmProps> = ({
  onConfirmSuccess,
}) => {
  const { session } = useSession();
  const [selectedAsset, setSelectedAsset] = useState<
    Omit<Transfer.Payload, "sessionTicket">
  >({
    itemIds: [],
    achievementIds: [],
  });

  const handleConfirm = () => {
    console.log("📲 TransferConfirm:", selectedAsset);
    if (
      selectedAsset.itemIds.length === 0 &&
      selectedAsset.achievementIds.length === 0
    ) {
      toast.warn("Please select at least one asset", {
        toastId: "transfer-confirm-error",
      });
      return;
    }

    onConfirmSuccess?.({
      sessionTicket: String(session?.sessionTicket),
      ...selectedAsset,
    });
  };

  return (
    <NoSSR>
      <AssetBox>
        <h1 className="text-3xl font-bold mb-8">Select Item for Transfer</h1>
        <div className="flex items-start gap-8 mb-[30px] flex-col lg:flex-row">
          <AssetList
            confirmMode
            onSelected={(items: number[]) => {
              setSelectedAsset((prev) => ({
                ...prev,
                itemIds: items,
              }));
            }}
          />
          <AchievementList
            confirmMode
            onSelected={(achievements: number[]) => {
              setSelectedAsset((prev) => ({
                ...prev,
                achievementIds: achievements,
              }));
            }}
          />
        </div>
        <div className="flex justify-end">
          <div>
            <Button className="w-[216px]" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </AssetBox>
    </NoSSR>
  );
};

export default TransferConfirm;
