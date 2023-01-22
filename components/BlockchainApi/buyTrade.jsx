import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import contractAddress from "./contractAddress";

export const Buy = (id, price) => {
  const { address, isConnected } = useAccount();
  const itemId = id.id;
  const itemPrice = price.price;
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    chainId: 5,

    overrides: {
      from: address,
      value: itemPrice,
    },
    functionName: "buyNFT",
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_itemId",
            "type": "uint256"
          }
        ],
        "name": "buyTrade",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
    ],
    args: [itemId],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data, isLoading, isSuccess, write, isError } =
    useContractWrite(config);

  if (isError) {
    return console.log(isError); // ACA VA LO RENDERIZADO SI SE PRODUCE UN ERROR
  }
  if (isSuccess) {
      console.log(data); // ACA VA LO RENDERIZADO SI SE CON EXITO
  }

  return (
    <>
      {isConnected && (
        <button
          onClick={() => write?.()}
        >
          BUY NFT
        </button>
      )}
    </>
  );
};