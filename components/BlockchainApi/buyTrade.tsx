import { BigNumber } from "ethers";
import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { TradeProps } from "../Trade/TradeCard";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

const BuyTrade = ({ id, price, seller }: TradeProps) => {
  const { address, isConnected } = useAccount();
  console.log(price)
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    chainId: +CHAIN_ID!,
    overrides: {
      from: address,
      value: price,
      gasLimit: BigNumber.from(30000000),
    },
    functionName: "buyTrade",
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_itemId",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function",
        "name": "buyTrade"
      },
    ],
    args: [id],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config);

  // TODO: do some checks here
  // if (isError) {
  return (
    <button
      // disabled={!isConnected || isLoading}
      onClick={() => write?.()}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {isLoading ? (
        'Check Wallet'
      ) : isSuccess ? ('Bought') : 'Buy'}
    </button>
  );

};

export default BuyTrade;