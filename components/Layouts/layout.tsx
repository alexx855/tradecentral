import Header from "../Header/header";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ReactNode } from "react";

const { chains, provider, webSocketProvider } = configureChains(
  [
    goerli,
  ],
  [process.env.NEXT_PUBLIC_ALCHEMY_ID ? alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }) : publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'TradeCentral demo',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Header />
          <main>{children}</main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}