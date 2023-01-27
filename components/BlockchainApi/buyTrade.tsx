import { BigNumber } from "ethers";
import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { TradeProps } from "../Trade/Trade";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS


const BuyTrade = ({ id, price, seller }: TradeProps) => {
  const { address, isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    // chainId: 5,
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

  if (isError) {
  }

  if (isSuccess) {
    // return <div>Success</div>;
  }

  if (address === seller)
    return null

  return (
    <>
      {isConnected && (
        <button
          disabled={!write || !isConnected || isLoading}
          onClick={() => write?.()}
        >
          {isLoading ? (
            'Check Wallet'
          ) : isSuccess ? ('Bought') : 'Buy'}
        </button>
      )}
    </>
  );
};

export default BuyTrade;