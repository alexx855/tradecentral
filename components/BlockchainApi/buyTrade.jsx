import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import contractAddress from "./contractAddress";

const BuyTrade = (id, price) => {
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
  const { data, isLoading, isSuccess, write, isError } = useContractWrite(config);

  return (<>
    <p>CARGANDO</p>
  </>)


  if (isLoading || typeof window === "undefined") {
    console.log(isLoading); // ACA VA LO RENDERIZADO SI SE ESTA CARGANDO
    return (<>
      <p>CARGANDO</p>
    </>)
  }

  if (isError) {
    console.log(isError); // ACA VA LO RENDERIZADO SI SE PRODUCE UN ERROR
    return (<>
      <p>ERROR</p>
    </>)
  }
  if (isSuccess) {
    console.log(data); // ACA VA LO RENDERIZADO SI SE CON EXITO

    return (<>
      <p>EXITO</p>
    </>)
  }

  return (
    <>
      {isConnected && (
        <button
          onClick={() => write()}
        >
          BUY
        </button>
      )}
    </>
  );
};

export default BuyTrade;