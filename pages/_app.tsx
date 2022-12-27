import "@fontsource/dm-sans";
import "typeface-rosario";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import NoSSR from "@/components/NoSSR";
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { publicProvider } from "wagmi/providers/public";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 1000 * 5,
    },
  },
});

const { chains, provider } = configureChains(
  [
    {
      id: 51,
      name: "XDC Apothem Testnet",
      network: "apothem",
      nativeCurrency: {
        name: "XDC",
        symbol: "XDC",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ["https://apothemxdcpayrpc.blocksscan.io/"],
        },
      },
      blockExplorers: {
        default: {
          name: "Blocksscan",
          url: "https://apothemxdcpayrpc.blocksscan.io/",
        },
      },
      testnet: true,
    },
  ],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: "r3plica",
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: "Wallets supporting XDC",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ appName: "r3plica", chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>r3plica</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/meta/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/meta/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/meta/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/meta/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/meta/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/meta/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/meta/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/meta/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/meta/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/meta/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/meta/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/meta/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/meta/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#1E2328" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#1E2328"></meta>
      </Head>

      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <NoSSR>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider
                chains={chains}
                modalSize="compact"
                initialChain={51}
              >
                <Component {...pageProps} />
              </RainbowKitProvider>
            </WagmiConfig>
          </NoSSR>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
