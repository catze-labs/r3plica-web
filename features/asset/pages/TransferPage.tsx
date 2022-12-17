import Layout from "@/components/Layout";
import NoSSR from "@/components/NoSSR";
import WalletConnectModal from "@/features/wallet/components/WalletConnectModal";
import { useState } from "react";
import TransferConfirm from "../components/TransferConfirm";
import Transfering from "../components/Transfering";

export default function Transfer() {
  const [signSuccess, setSignSuccess] = useState<boolean>(false);
  const [needWalletConnect, setNeedWalletConnect] = useState<boolean>(false);

  return (
    <Layout mainCentered>
      <NoSSR>
        {!signSuccess && (
          <TransferConfirm
            onConfirmSuccess={(confirmed) => {
              // setMockSuccess(true);
              setNeedWalletConnect(true);
            }}
          />
        )}

        {signSuccess && <Transfering />}

        <WalletConnectModal
          open={needWalletConnect}
          onClose={() => setNeedWalletConnect(false)}
          onSignSuccess={(walletAddress, signature) => {
            // TODO: transfer API call
            setNeedWalletConnect(false);
            setSignSuccess(true);
          }}
        />
      </NoSSR>
    </Layout>
  );
}
