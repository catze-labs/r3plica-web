import Layout from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import WalletConnectModal from "@/features/wallet/components/WalletConnectModal";
import { useTransfer } from "@/requests/transfer";
import { useState } from "react";
import { toast } from "react-toastify";
import TransferConfirm from "../components/TransferConfirm";
import Transfering from "../components/Transfering";

export default function Transfer() {
  const [signSuccess, setSignSuccess] = useState<boolean>(false);
  const [needWalletConnect, setNeedWalletConnect] = useState<boolean>(false);

  const [confirmed, setConfirmed] = useState<Transfer.Payload | null>(null);

  const { mutate, isLoading } = useTransfer(
    (res) => {
      console.log("📲 Transfer:", res);
    },
    (error) => {
      toast.error(error.message);
    }
  );

  return (
    <Layout mainCentered>
      <NoSSR>
        {!signSuccess && (
          <TransferConfirm
            onConfirmSuccess={(confirmed) => {
              setNeedWalletConnect(true);
              setConfirmed(confirmed);
            }}
          />
        )}

        {signSuccess && <Transfering isLoading={isLoading} />}

        <WalletConnectModal
          open={needWalletConnect}
          onClose={() => setNeedWalletConnect(false)}
          onSignSuccess={(walletAddress, signature) => {
            setNeedWalletConnect(false);
            setSignSuccess(true);

            if (confirmed) {
              mutate(confirmed);
            }
          }}
        />
      </NoSSR>
    </Layout>
  );
}
