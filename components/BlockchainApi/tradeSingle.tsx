
import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import tradePlaceholderPic from '../../public/image-1@2x.jpg'
import BuyTrade from '../BlockchainApi/buyTrade';
import SellerInfo from './SellerInfo';
import { useContractRead } from 'wagmi';
import Link from 'next/link';

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
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "image",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "name",
                "type": "string[]"
              },
              {
                "internalType": "string[]",
                "name": "category",
                "type": "string[]"
              },
              {
                "internalType": "string[]",
                "name": "country",
                "type": "string[]"
              },
              {
                "internalType": "bool",
                "name": "isSold",
                "type": "bool"
              }
            ]
          }
        ]
      },
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
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data.name[1]}</h1>
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

        {/* Similar trades links */}
        <div className="flex items-center justify-between mt-4">
          {/* <Link href={`/country/${props.country}/${props.category}/${props.name}`} >
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-full dark:text-white dark:bg-gray-700">Related</span>
          </Link> */}
          <Link href={`/category/${data.category[0]}`} className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-full dark:text-white dark:bg-gray-700">
            <svg className="w-4 h-4 mr-2 -ml-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"></path>
            </svg>
            {data.category[1]}
          </Link>
          <Link href={`/country/${data.country[0]}`} className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-full dark:text-white dark:bg-gray-700" >
            <svg className="w-4 h-4 mr-2 -ml-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"></path>
            </svg>
            {data.country[1]}
          </Link>
        </div>

      </div>)}
    </div>

  );
};

export default Trade;