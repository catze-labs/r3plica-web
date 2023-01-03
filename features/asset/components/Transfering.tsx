import Button from "@/components/Button";
import useFetchBscScanLoop from "@/requests/bscScan";
import { ArrowsUpDownIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

interface TransferingProps {
  isLoading: boolean;
  transferResponse: Transfer.Response | null;
}

enum TxStatus {
  Pending = "",
  Success = "1",
  Failed = "0",
}

const Transfering: React.FC<TransferingProps> = ({
  isLoading,
  transferResponse,
}) => {
  const router = useRouter();

  const { achievementTxHash, itemTxHash } = transferResponse || {};

  return (
    <div className="flex flex-col gap-8 items-center">
      <div
        className="w-32 h-32 rounded-full flex justify-center items-center"
        style={{
          background: "rgba(234, 236, 239, 0.1)",
        }}
      >
        {isLoading ? (
          <ArrowsUpDownIcon className="w-[50px] text-yellow animate-buoyancy-1" />
        ) : (
          <CheckCircleIcon className="w-[50px] text-yellow" />
        )}
      </div>
      <h2 className="text-2xl font-bold text-center">
        {isLoading
          ? "Transaction processing..."
          : // : txStatus === TxStatus.Failed
            // ? "Transaction Failed"
            // : txStatus === TxStatus.Pending
            // ? "Transaction is pending..."
            "Transaction is successfully sent."}
      </h2>
      <p className="text-sm text-center">
        {isLoading ? (
          <>
            We are transfering <span className="tracking-widest">fSBT</span> to
            your wallet. <br />
            Please wait until transfering is done
          </>
        ) : null}
      </p>
      <div className="p-3 bg-[rgba(255,255,255,0.2)] rounded-lg w-[300px] overflow-x-auto">
        {itemTxHash && (
          <>
            Item :{" "}
            <a
              className="hover:underline"
              href={`https://apothem.blocksscan.io/txs/${itemTxHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {itemTxHash}
            </a>
          </>
        )}
        {achievementTxHash && (
          <>
            <br />
            <br />
            Achievement :{" "}
            <a
              className="hover:underline"
              href={`https://apothem.blocksscan.io/txs/${achievementTxHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {achievementTxHash}
            </a>
          </>
        )}
      </div>

      {!isLoading && (
        <div className="flex flex-col gap-2 w-full">
          <Button
            className="px-4 bg-brown"
            onClick={() => router.push("/fsbt")}
          >
            Show My SBT
          </Button>
        </div>
      )}
    </div>
  );
};

export default Transfering;
