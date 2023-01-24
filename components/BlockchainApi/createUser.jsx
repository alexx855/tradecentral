import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import contractAddress from "./contractAddress";

const CreateUser = () => {
  const { address, isConnected } = useAccount();
  const [email, setEmail] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");


  const { config } = usePrepareContractWrite({
    address: contractAddress,
    chainId: 5,
    overrides: {
      from: address,
      gasLimit: 1000000,
    },
    abi: [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "image",
            "type": "string"
          }
        ],
        "name": "createUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    args: [email, name, tokenURI],
    enabled: [email, name, tokenURI],
    functionName: "createUser",
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
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className=""
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input className=""
              placeholder="profile image"
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <br />
            {/* address form */}

            <button
              onClick={() => write?.()}
              colorScheme="blue"
              borderRadius={"10px"}
              size={"lg"}
            >
              Create
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

export default CreateUser;