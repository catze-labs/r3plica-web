import Button from "@/components/Button";
import { ArrowsUpDownIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";

interface TransferingProps {
  isLoading: boolean;
}

const Transfering: React.FC<TransferingProps> = ({ isLoading }) => {
  const router = useRouter();

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
        {isLoading ? "Transfering..." : "Transfer Complete!"}
      </h2>
      <p className="text-sm text-center">
        {isLoading ? (
          <>
            We are transfering fSBT to your wallet. <br />
            Please wait until transfering is done
          </>
        ) : null}
      </p>

      {!isLoading && (
        <div className="flex flex-col gap-2 w-full">
          <Button className="px-4" onClick={() => router.push("/fsbt")}>
            Show My SBT
          </Button>
          <Button className="bg-brown px-4">View Transaction on BscScan</Button>
        </div>
      )}
    </div>
  );
};

export default Transfering;
