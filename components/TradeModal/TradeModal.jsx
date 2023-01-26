import { BigNumber, ethers } from "ethers";
import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const { address, isConnected } = useAccount();
  const [price, setPrice] = useState(0);
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");


  //@dev wagmi function 

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    // chainId: 5,
    overrides: {
      from: address,
      // gasLimit: 1000000000,
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
    args: [ethers.BigNumber.from(price), name, desc, tokenURI],
    // enabled: [price, name, desc, tokenURI],
    functionName: "createTrade",
  });
  const { write, isLoading, isSuccess, data } = useContractWrite(config);
  if (isSuccess) {
    setShowModal(false);
  }

  // onChange={(e) => setTokenURI(e.target.value)} set token uri
  return (

    <>
      <div className="flex justify-center m-5">
        <button onClick={() => setShowModal(true)} id="defaultModalButton" data-modal-toggle="defaultModal" className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
          Create Trade
        </button>
      </div>

      {showModal && isConnected ? (
        <>
          <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Product
                  </h3>
                  <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />Name
                      <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                    </div>
                    <div>
                      <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                      <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" />
                    </div>
                    <div>
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input onChange={(e) => setPrice(+e.target.value)} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
                    </div>
                    <div>
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected>Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea onChange={(e) => setDesc(e.target.value)} id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here"></textarea>
                    </div>
                  </div>
                  <button onClick={() => write?.()} className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;