import Button from "@/components/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AssetBox from "./AssetBox";
import AssetList from "./AssetList";
import EntitlementList from "./EntitlementList";

type MockAssetPayload = {
  inventory: number[];
  entitlement: number[];
};

interface TransferConfirmProps {
  onConfirmSuccess?: (confirmed: MockAssetPayload) => void;
}

const TransferConfirm: React.FC<TransferConfirmProps> = ({
  onConfirmSuccess,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<MockAssetPayload>({
    inventory: [],
    entitlement: [],
  });

  const handleConfirm = () => {
    console.log(selectedAsset);

    if (
      selectedAsset.inventory.length === 0 &&
      selectedAsset.entitlement.length === 0
    ) {
      toast.warn("Please select at least one asset", {
        toastId: "transfer-confirm-error",
      });
      return;
    }

    // TODO: call api to transfer asset
    onConfirmSuccess?.(selectedAsset);
  };

  return (
    <AssetBox>
      <h1 className="text-3xl font-bold mb-8">Select Item for Transfer</h1>
      <div className="flex items-start gap-8 mb-[30px] flex-col lg:flex-row">
        <AssetList
          confirmMode
          onSelected={(items: number[]) => {
            setSelectedAsset((prev) => ({
              ...prev,
              inventory: items,
            }));
          }}
        />
        <EntitlementList
          confirmMode
          onSelected={(entitles: number[]) => {
            setSelectedAsset((prev) => ({
              ...prev,
              entitlement: entitles,
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
  );
};

export default TransferConfirm;
