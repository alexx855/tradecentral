
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Address, useAccount, useContractRead } from 'wagmi';
import Balance from '../BlockchainApi/balance';
import Cancel from '../BlockchainApi/Cancel';
import { GetAllItems } from '../BlockchainApi/ListedTokens';
import Staking from '../BlockchainApi/Staking';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

// export interface UserProps {
//   address: Address;
//   email?: string;
//   name?: string;
//   image?: string;
// }

// export function trimAddress(address: string) {
//   if (!address || address.length < 6) throw new Error('Invalid address');
//   return `${address.slice(0, 2)}...${address.slice(-4)}`
// }

const User = () => {
  const { address, isConnected } = useAccount();
  const [displayUserFrom, setDisplayUserFrom] = useState(false);

  const { data = false, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    chainId: 5,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "userExists",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ]
      }
    ],
    functionName: 'userExists',
    args: [address],
  })

  const { data: userData, isError: userIsError, isLoading: userIsLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    chainId: 5,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "lookUsers",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "image",
                "type": "string"
              }
            ],
            "internalType": "struct TradeCentral.userData",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    args: [address],
    enabled: !!data,
    functionName: "lookUsers",
  });


  // useEffect(() => {
  //   setDisplayUserFrom(isConnected && address === props.address);
  // }, [props.address, address, isConnected])
  const { trades } = GetAllItems();
  const trademap = trades?.filter((trade) => trade.seller === address).map((trade) => {
    return trade;
  });
  console.log(trademap)
  return (
    <section id={`user-${address}`}>
      <>
        <Balance />
        {trades?.filter((trade) => trade.seller === address).map((trade) => {
          return (

            <div key={trade.id} className="items-center justify-center flex flex-col">
              <h1>{trade.name}</h1>
              <Cancel id={trade.id} />
              <Staking id={trade.id} />
              {trade.image ? (
                <Image width={40} height={40} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={trade.image} alt={`${trade.name ? trade.name : trimAddress(trade.address)} avatar`} />
              ) : (
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
              )}

              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white ">
                {trade.name ? (<span className="text-gray-500 ">{trade.name}</span>) : trimAddress(trade.address)}
              </h3>


            </div>
          )
        })}

      </>
    </section>
  );
};

export default User;