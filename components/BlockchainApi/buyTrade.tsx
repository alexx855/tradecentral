import { BigNumber, ethers, utils } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { GetAllItems } from "./ListedTokens";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID


const BuyTrade = (id: any, price: any) => {
const finalPrice = ethers.utils.formatUnits(id.price,"ether");
const {trades } = GetAllItems();
console.log(trades, "tradessssdds")
  const { address, isConnected } = useAccount();
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    chainId: +CHAIN_ID!,
    overrides: {
      from: address,
      value: id.price,
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
    args: [id.id],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config);

  if(trades?.filter((trade: any) => trade.isSold === true)) {

  return (
    <button
      disabled={!isConnected || isLoading}
      onClick={() => write?.()}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {isLoading ? (
        'Check Wallet'
      ) : isSuccess ? ('Bought') : 'Buy'}
    </button>
  );
  }
};

export default BuyTrade;