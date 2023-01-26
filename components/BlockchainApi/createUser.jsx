import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const CreateUser = () => {
  const { address, isConnected } = useAccount();
  const [email, setEmail] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");


  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    // chainId: 5,
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


  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center">
        <span className=" text-2xl font-bold text-gray-500">
          Please connect your wallet
        </span>
      </div>
    );
  }

  return (
    <>

      <div className=" flex flex-col items-center justify-center" >
        <div className="">

          <input className=""
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className=""
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* TODO: implement images storage with lighthouse SKD */}
          {/* <input className=""
            placeholder="profile image"
            onChange={(e) => setTokenURI(e.target.value)}
          /> */}
          <br />
          {/* address form */}

          <button
            onClick={() => write()}
          >
            Create an user for {address}
          </button>
        </div>
      </div>

    </>
  );
};

export default CreateUser;