import Button from "@/components/Button";
import Modal, { ModalProps } from "@/components/Modal";
import { useWalletAPI } from "@/requests/wallet";
import { useSession } from "@/states/session";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import useBinanceWallet from "../hooks/useBinanceWallet";

interface WalletConnectModalProps extends ModalProps {
  onSignSuccess?: (walletAddress: string, signature: string) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  onSignSuccess,
  ...props
}) => {
  const { session } = useSession();
  const { generateNonce, link } = useWalletAPI();
  const { account, activate, sign } = useBinanceWallet();

  const [signature, setSignature] = useState<string | null>(null);

  const onSign = async () => {
    const res = await generateNonce({ walletAddress: String(account) });
    if (!res) {
      toast.error("Fail to generate nonce");
      return;
    }
    const _signature = await sign(res.nonce);

    if (!_signature) {
      toast.error("Fail to sign");
      return;
    }
    // link to backend
    link({
      walletAddress: String(account),
      signature: _signature,
      sessionTicket: String(session?.sessionTicket),
    });

    setSignature(_signature);
  };

  return (
    <Modal
      {...props}
      title={
        !account
          ? `Connect Wallet`
          : !signature
          ? `You need to sign message`
          : `Wallet Connected!`
      }
    >
      {!account && (
        <div className="flex flex-col gap-5">
          <button
            className="w-[320px] bg-black-dark border border-yellow h-16 rounded-lg flex justify-center items-center gap-4"
            onClick={activate}
          >
            <Image
              src="/logo-binance.svg"
              width={24}
              height={24}
              alt="BINANCE"
            />
            <span className="text-lg font-bold">BINANCE WALLET</span>
          </button>
          <div className="flex gap-4 justify-center">
            <p>Have no wallet?</p>
            <a
              className="text-yellow hover:underline"
              rel="noreferrer"
              target="_blank"
              href="https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp"
            >
              Download Chrome Extension
            </a>
          </div>
        </div>
      )}
      {account && !signature && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-center items-center gap-4">
            <Image
              src="/logo-binance.svg"
              width={48}
              height={48}
              alt="BINANCE"
            />
            <PencilIcon className="w-6 text-yellow animate-buoyancy-1" />
          </div>
          <Button onClick={onSign}>Sign</Button>
        </div>
      )}

      {account && signature && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-center pb-2">
            <CheckCircleIcon className="w-14 text-yellow" />
          </div>
          <Button onClick={() => onSignSuccess?.(account, signature)}>
            Start Transfer
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default WalletConnectModal;
