
import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import tradePlaceholderPic from '../../public/image-1@2x.jpg'
import BuyTrade from '../BlockchainApi/buyTrade';
import SellerInfo from './SellerInfo';
import { useContractRead } from 'wagmi';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

const Trade = ({ tid }: { tid: number }) => {

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    chainId: +CHAIN_ID!,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_itemId",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "lookTrades",
        "outputs": [
          {
            "internalType": "struct TradeCentral.Trade",
            "name": "",
            "type": "tuple",
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "image",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "isSold",
                "type": "bool"
              }
            ]
          }
        ]
      }
    ],
    args: [BigNumber.from(tid)],
    functionName: "lookTrades",
  });

  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        {/* TODO: load image from lighthouse */}
        <Image className="p-8 rounded-t-lg" src={tradePlaceholderPic} alt={`Trade #${tid} image`} />
      </div>
      {data && (<div className="px-5 pb-5">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.name}</h1>
        <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{data.description}</h2>

        {/* Buy CTA */}
        {data.price && (<div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">Ξ{`${utils.formatUnits(data.price).slice(0, 6)}`}</span>
          <BuyTrade {...data} />
        </div>)}

        {/* Seller info */}
        {data.seller && (<div className="">
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Seller</h3>
          <SellerInfo address={data.seller} />
        </div>)}

      </div>)}
    </div>

  );
};

export default Trade;