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

  const txHash =
    "0x25d4cf0a317a2e23d985ff0e8321b62218c83fa9173551e06eb4229e6773a72f";

  const { data: bscScan } = useFetchBscScanLoop(txHash);

  const txStatus = bscScan?.result.status;

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
        ) : txStatus === TxStatus.Failed ? (
          <XMarkIcon className="w-[50px] text-red-500" />
        ) : (
          <CheckCircleIcon className="w-[50px] text-yellow" />
        )}
      </div>
      <h2 className="text-2xl font-bold text-center">
        {isLoading
          ? "Transfering..."
          : txStatus === TxStatus.Failed
          ? "Transaction Failed"
          : txStatus === TxStatus.Pending
          ? "Transaction is pending..."
          : "Transaction is successfully sent."}
      </h2>
      <p className="text-sm text-center">
        {isLoading ? (
          <>
            We are transfering <span className="tracking-wider">fSBT</span> to
            your wallet. <br />
            Please wait until transfering is done
          </>
        ) : null}
      </p>

      {!isLoading && (
        <div className="flex flex-col gap-2 w-full">
          <Button
            className={clsx([
              "px-4",
              txStatus === TxStatus.Success && "bg-yellow",
              txStatus === TxStatus.Failed && "bg-red-500 text-white",
              txStatus === TxStatus.Pending && "bg-gray",
            ])}
            disabled={txStatus === TxStatus.Pending}
            onClick={() => {
              window.open(`https://testnet.bscscan.com/tx/${txHash}`, "_blank");
            }}
          >
            {txStatus === TxStatus.Success
              ? "View on BscScan"
              : txStatus === TxStatus.Failed
              ? "Failed"
              : "Pending..."}
          </Button>
          {txStatus === TxStatus.Success && (
            <Button className="px-4" onClick={() => router.push("/fsbt")}>
              Show My SBT
            </Button>
          )}
          {txStatus === TxStatus.Failed && (
            <a
              className="text-center text-sm text-red-500 hover:underline"
              href={`mailto:root-catze@catze.xyz?subject=Transaction Failed&body=Transaction : ${txHash}`}
            >
              Report Error
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Transfering;
