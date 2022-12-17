import { useState } from "react";
import { BscConnector, NoBscProviderError } from "@binance-chain/bsc-connector";
import { toast } from "react-toastify";

export default function useBinanceWallet() {
  const connector = new BscConnector({ supportedChainIds: [97] });

  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [chainId, setChainId] = useState<number | string | null>(null);

  const activate = async () => {
    try {
      const { account, provider } = await connector.activate();

      if (!account || !provider) {
        toast.error("No account or provider detected");
        return;
      }

      /**
       * Get the account and provider from the Binance Wallet
       */
      setAccount(String(account));
      setProvider(provider);

      /**
       * Get the current chain id
       */
      const chainId = await provider.request({
        method: "eth_chainId",
      });

      setChainId(chainId);

      /**
       * Listen for network changes
       */
      provider.on("chainChanged", (chainId: number | string) => {
        setChainId(chainId);
      });
    } catch (error: unknown) {
      if (error instanceof NoBscProviderError) {
        toast.error("No Binance Wallet extension detected, installing now");
      } else {
        console.error(error);
      }
    }
  };

  const changeNetwork = async () => {
    try {
      // check the network already connected
      const chainId = await provider.request({
        method: "eth_chainId",
      });

      // Change the network to Binance Smart Chain Testnet
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            chainName: "Binance Smart Chain Testnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "bnb",
              decimals: 18,
            },
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            blockExplorerUrls: ["https://testnet.bscscan.com"],
          },
        ],
      });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const sign = async (nonce: string) => {
    try {
      if (!provider) {
        toast.error("No provider detected, Please connect Wallet.", {
          toastId: "no-provider",
        });
        return null;
      }

      const signature = await provider.request({
        method: "personal_sign",
        params: [nonce, account],
      });

      return signature;
    } catch (error: unknown) {
      return null;
    }
  };

  return {
    account,
    provider,
    activate,
    chainId,
    changeNetwork,
    sign,
  };
}
