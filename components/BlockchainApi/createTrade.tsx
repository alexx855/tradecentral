import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { BigNumber } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export const CreateTrade = () => {
  const { address, isConnected } = useAccount();
  const [price, setPrice] = useState(0);
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    // chainId: 5,
    overrides: {
      from: address,
      // gasLimit: 1000000,
    },
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_image",
            "type": "string"
          }
        ],
        "name": "createTrade",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    args: [BigNumber.from(price), name, desc, tokenURI],
    // enabled: [price, name, desc, tokenURI],
    functionName: "createTrade",
  });
  const { write } = useContractWrite(config);

  return (
    <>
      {isConnected ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div className="">
            
            <input className=""
              placeholder="price"
              onChange={(e) => setPrice(+e.target.value)}
            />
            <input className=""
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input className=""
              placeholder="description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <input className=""
              placeholder="item image"
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <br />
            {/* address form */}
           
            <button
              onClick={() => write?.()}
            >
              LIST ITEM
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
         <h1>connect your wallet for create a profile</h1>
        </div>
      )}
    </>
  );
};

export default CreateTrade;