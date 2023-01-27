import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { localhost, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import Header from '../components/Header/header';

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_ANVIL === 'true' ? [localhost] : [goerli]),
  ],
  [process.env.NEXT_PUBLIC_ENABLE_ANVIL === 'true' ? publicProvider() : alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || 'undefined' })]
);


// Set up client
const client = createClient({
  autoConnect: false, // Don't connect automatically, netxjs will fail hydration if we do
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
})


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <WagmiConfig client={client}>
      <Header />
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

