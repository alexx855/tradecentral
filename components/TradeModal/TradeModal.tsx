import { BigNumber, ethers } from "ethers";
import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
import lighthouse from '@lighthouse-web3/sdk';
const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const { address, isConnected } = useAccount();
  const [price, setPrice] = useState(99);
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  // const { chain } = useNetwork()

  //@dev wagmi function 
  const chainId = +process.env.NEXT_PUBLIC_CHAIN_ID!
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    chainId,
    overrides: {
      from: address,
      gasLimit: BigNumber.from(1000000),
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
            "name": "_category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_country",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_image",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "createTrade"
      },
    ],
    args: [ethers.BigNumber.from(price), name, desc, category, country, tokenURI],
    functionName: "createTrade",
    onError(err) {
      console.log("error", err)
    },
    onSuccess() {
      console.log("success")
    },
    onSettled() {
      console.log("settled")
    }
  });
  const { write, isLoading, isSuccess, data } = useContractWrite(config);

 

  const handleFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
    // TODO: validate from before submit
    write?.();
  };



  //light house 
 

interface ProgressData {
  total: number;
  uploaded: number;
}

const progressCallback = (progressData: ProgressData) => {
  if(progressData){
    let percentageDone = ((progressData.uploaded / progressData.total) * 100)?.toFixed(2);
    console.log(percentageDone);
  }
};

  const deploy = async (e: any) => {
    // Push file to lighthouse node
    const output = await lighthouse.upload(e, API_KEY!, progressCallback);
    // const uri = 'https://gateway.lighthouse.storage/ipfs/' + output.data.Hash;
    console.log(output.data.Hash);
    if (output.data.Hash) {
      setTokenURI(output.data.Hash);
    } else {
      console.log("error uploading image");
    }
    // console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }


  return (
    <>
      <button onClick={() => setShowModal(true)} id="defaultModalButton" data-modal-toggle="defaultModal" className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {/* Create Trade */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </span>
      </button>

      {showModal && isConnected && (
        <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Product
                </h3>
                <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {isLoading ? (
                <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                  <span className="font-medium">Check Wallet</span>
                </div>
              ) : isSuccess ? (
                <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                  <span className="font-medium">Transaction</span> {JSON.stringify(data)}
                </div>
              ) : (
                <form onSubmit={handleFrom} >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Name</label>
                      <input defaultValue={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                    </div>
                    {/* <div>
                      <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                      <input value={name} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" />
                    </div> */}
                    <div>
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input defaultValue={price} onChange={(e) => setPrice(+e.target.value)} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
                    </div>
                    <div>
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option defaultValue="">Select category</option>
                        <option  value="TV/Monitors">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="Gaming/Console">Gaming/Console</option>
                        <option  value="Phones">Phones</option>
                      </select>
                    </div>
                     <div>
                      <label htmlFor="Country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                      <input defaultValue={"brasil"} onChange={(e) => setCountry(e.target.value)} type="text" name="Country" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="France" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea defaultValue={desc} onChange={(e) => setDesc(e.target.value)} id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>
                    </div>
                    <div>
                      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                      <input  onChange={e=>deploy(e)} type="file" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
                    </div>
                  </div>
                  <button disabled={!write} type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Publish trade
                  </button>
                </form>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;