![image](https://user-images.githubusercontent.com/65929678/208289087-4f1061e8-5e23-4b9a-8609-64c52e7d9640.png)

# r3plica-web

`r3plica` is a project born from BNB Chain Innovation Hackathon 2022 - Seoul, and this repository is the front-end of `r3plica` project.


The r3plica-web implements these key features.

- Sign in, sign up for authentication.
- You can view the items obtained in the game and the entries obtained through the quests performed (defined as "My Assets") that are made of fSBT.
- You can transfer the fSBT confirmed by My Assets to your wallet address.
- You can view the transfer-completed fSBT through "My fSBT".

## Library in use

| Name                         | Range                                                         | Link                                                       |
| ---------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| React (Next.js)              | Front-end Framework                                           | https://ko.reactjs.org/                                    |
| Axios                        | Interaction with Server                                       | https://axios-http.com/                                    |
| React-Query                  | Server state management and Server response cache utilization | https://react-query-v3.tanstack.com/                       |
| Recoil                       | Global State Management                                       | ​​https://recoiljs.org/                                    |
| @binance-chain/bsc-connector | Interaction with Binance Wallet                               | https://www.npmjs.com/package/@binance-chain/bsc-connector |
| tailwindcss                  | Utility-based CSS Library                                     | https://tailwindcss.com/                                   |

The r3plica front-end uses React.js (Next.js). In addition, Axios required for API calls is used by wrapping the functions provided by React-Query.

React-Query has the ability to cache responses from servers for a certain period of time and allows them to "invalidate" as needed, giving them the effect of calling only once, even if there are multiple API call codes. This reduces unnecessary duplicate API calls. In addition, it is easy to divide components because there are no restrictions on writing API call syntax.

Tailwindcss is a choice purely based on personal taste, and you can use a different CSS library to suit your project's purpose.

## Project Structure

A scalable structure is recommended to consider the addition and change of various features in the construction of the front-end project. At the front-end of this fSBT, files are grouped in feature units.

| Feature name | Usage                                                       |
| ------------ | ----------------------------------------------------------- |
| landing      | Landing page components                                     |
| auth         | Login, Signup                                               |
| wallet       | Wallet Connect Modal, Sign Message Modal                    |
| asset        | Inventory, Achievements from Playfab                        |
| fsbt         | fSBT information which is transferred to the user's wallet. |

Each of the above features contains the components used in the feature, the pages to be routed, and the various hooks.

Each feature can be referenced using a different feature, and how it is determined depends entirely on the judgment of the front-end developer.

Here, we separated the hook for API call and the part that manages global states into a directory inside /, not inside /feature. /requests is a collection of hooks for API calls, and /states is a collection of Recoil-atoms for managing global states. The reason is for ease of management. In addition, the types to use in the project are located in /types.

The diagram at next page provides a more detailed view of the structure.

![https://lh6.googleusercontent.com/2mxNzLAIN-yTjN9kQIK5OzHBJmjx7ERau5nzLAGeDlGwXsrYz6R4QjCh4gnVqNbXlzunijMP5SePQVhNzQcn8DSViaNoCrcplyA9n8qi6oGiIBYz_8ZhlkU-mQ1baEZ9ORC1uXNz75GA4tmxASWyZ9qwWst_Q-9jH9dC7Sa8D9a-N5s8WGLQ9G99unxDUQ](https://lh6.googleusercontent.com/2mxNzLAIN-yTjN9kQIK5OzHBJmjx7ERau5nzLAGeDlGwXsrYz6R4QjCh4gnVqNbXlzunijMP5SePQVhNzQcn8DSViaNoCrcplyA9n8qi6oGiIBYz_8ZhlkU-mQ1baEZ9ORC1uXNz75GA4tmxASWyZ9qwWst_Q-9jH9dC7Sa8D9a-N5s8WGLQ9G99unxDUQ)

## Session Ticket Management

You must have a token to call a private API that requires user authentication. Since fSBT is using Playfab, it uses sessionTicket as its token.

```tsx
// /states/session.ts

interface Session {
  sessionTicket: string;
}

export const sessionAtom = atom<Session | null>({
  key,
  default: null,
  effects: [localStorageEffect(key)],
});
```

After logging in, a sessionTicket is issued, which is stored in the global state using a Recoil called sessionAtom.

localStorageEffect is used to ensure that the user's session is persisted, which makes the user experience better. The code for localStorageEffect is as follows.

```tsx
// states/localStorageEffect.ts

import { AtomEffect } from "recoil";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") {
      return;
    }

    const savedValue = window.localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? window.localStorage.removeItem(key)
        : window.localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export default localStorageEffect;
```

sessionTicket stored in Localstorage can be applied to the axios interceptor. However, in r3plica project, when calling API, sessionTicket is directly injected into body or parameters.

## Binance Wallet Connect

To use the Binance Wallet on the client, you can use the globally injected method from window.BinanceChain. However, if you use this part directly, it is inconvenient to specify the type manually if you use TypeScript. Therefore, r3plica used the @binance-chain/bsc-connector npm library.

r3plica configured useBinanceWallet, a hook consisting of two methods for interacting with the Binance Wallet.

- activate()is a function to activate the Binance Wallet.
- changeNetwork() is a method for changing the network of the binance chain.
- sign() is a method of signing messages created through eigenvalues randomly generated by nonce through the Binance Wallet.

features/wallet/hooks/useBinanceWallet.ts

```tsx
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
```

In the hook above, the return also includes a flag state that helps users recognize the wallet connection.

The functions created here are based on the examples provided in the web3-react library and can be modified to provide better user experience by adding more advanced logic.
