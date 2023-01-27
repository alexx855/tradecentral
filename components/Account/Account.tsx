import Link from 'next/link';
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi';
import CreateTradeModalCTA from '../TradeModal/TradeModal';

export function NetworkSelect({ children }: { children: React.ReactNode }) {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <>
      {
        chain && chains.findIndex((x) => x.id === chain.id) === -1 ? (
          chains.map((x) => (
            <button
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
              className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Wrong Network, switch to {x.name}
                {isLoading && pendingChainId === x.id && ' (switching)'}
                {error && ` (${error.message})`}
              </span>
            </button>
          ))
        ) : (children)
      }
    </>
  )
}

export function Connect() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { address, isConnected } = useAccount();
  return (
    <>
      {error && <span>{error.message}</span>}

      {
        isConnected ? (
          <>
            <CreateTradeModalCTA />

            <Link href={`/user/${address}`} className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Profile
              </span>
            </Link>
          </>
        ) : connectors.map((connector) => (
          <button
            className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Connect with {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </span>
          </button>
        ))
      }

    </>
  )
}

const Account = () => {
  return (
    <NetworkSelect>
      <Connect />
    </NetworkSelect>
  );

};

export default Account