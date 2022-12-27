import Button from "@/components/Button";
import Modal, { ModalProps } from "@/components/Modal";
import { useWalletAPI } from "@/requests/wallet";
import { sessionAtom } from "@/states/session";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useSignMessage, useAccount, useDisconnect } from "wagmi";

interface WalletConnectModalProps extends ModalProps {
  onSignSuccess?: (walletAddress: string, signature: string) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  onSignSuccess,
  ...props
}) => {
  const session = useRecoilValue(sessionAtom);
  const [nonce, setNonce] = useState<string>("");

  const { generateNonce, link } = useWalletAPI();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();
  const {
    data: signature,
    signMessage,
    isSuccess: isSignSuccess,
  } = useSignMessage({
    message: nonce,
    onSuccess: (signature) => {
      if (!session?.sessionTicket || !address) return;
      link({
        sessionTicket: session?.sessionTicket,
        walletAddress: address,
        signature,
      });
    },
  });

  useEffect(() => {
    if (!address) return;

    generateNonce({
      walletAddress: address,
    }).then((res) => {
      setNonce(res?.nonce || "");
    });
  }, [address]);

  useEffect(() => {
    if (isConnected) return;

    // add new chain
    try {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x33", // 51
            chainName: "XDC Apothem Testnet",
            nativeCurrency: {
              name: "XDC",
              symbol: "XDC",
              decimals: 18,
            },
            rpcUrls: ["https://apothemxdcpayrpc.blocksscan.io/"],
            blockExplorerUrls: ["https://apothemxdcpayrpc.blocksscan.io/"],
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }, [isConnected]);

  return (
    <Modal {...props} title="Connect Wallet">
      {!isConnected && (
        <button
          className="w-[320px] bg-black-dark border border-yellow h-16 rounded-lg flex justify-center items-center gap-4"
          onClick={async () => {
            disconnect();
            openConnectModal?.();
          }}
        >
          <Image src="/landing/logo-xdc.png" width={24} height={24} alt="XDC" />
          <span className="text-lg font-bold">CONNECT WALLET</span>
        </button>
      )}
      {isConnected && !signature && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-center items-center gap-4">
            <Image
              src="/landing/logo-xdc.png"
              width={48}
              height={48}
              alt="XDC"
            />
            <PencilIcon className="w-6 text-yellow animate-buoyancy-1" />
          </div>
          <Button onClick={() => signMessage()}>Sign</Button>
        </div>
      )}
      {isConnected && isSignSuccess && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-center pb-2">
            <CheckCircleIcon className="w-14 text-yellow" />
          </div>
          <Button
            onClick={() => onSignSuccess?.(address || "", signature || "")}
          >
            Start Transfer
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default WalletConnectModal;
