import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../components/Layouts/layout';
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import { GetAllItems } from '../../components/BlockchainApi/ListedTokens';
import Link from 'next/link';
import SellerInfo from '../../components/BlockchainApi/SellerInfo';
import BuyTrade from '../../components/BlockchainApi/buyTrade';
import Image from 'next/image';
import { BigNumber, utils } from 'ethers';
import { FaEthereum } from "react-icons/fa";
// const TradeSingleNoSSR = dynamic(() => import('../../components/BlockchainApi/tradeSingle'), {
//   ssr: false,
// })


const REVIEWS_FLAG = false;

const TradePage = () => {
  const { trades } = GetAllItems();
  console.log(trades, "trades")
  const router = useRouter();
  const { id } = router.query;
  const itemId = parseInt(id);
  const bool = trades?.some((item) => {
    return item.id === itemId;
  });
  const [ethPrice, setEthPrice] = useState(0);
  const getEthPrice = async () => {
    const response = await fetch("https://api.coinlore.net/api/ticker/?id=80");
    const data = await response.json(); // Extracting data as a JSON Object from the response
    const parseNumber1 = data[0].price_usd;

    setEthPrice(parseNumber1);
  };

  useEffect(() => {
    getEthPrice();
  }, []);

  console.log(bool)
  const tradesmap = trades?.filter((item) => {
    return item.id = itemId;
  })
  console.log(tradesmap)



  return (
    <div className="px-4 pb-4 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {trades?.filter((item) => {
        return item.id === itemId;
      }).map((item) => (
        <>
          <h1 className="mt-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
          <div className='my-8'>
            <Image className="rounded-t-lg" width={50} height={50} src={item.image} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name[1]}</h1>
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{item.description}</h2>

          {/* Buy CTA */}
          {item.price && (<div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white"><FaEthereum />{`${utils.formatUnits(item.price).slice(0, 6)}`}</span>
            <BuyTrade />
          </div>)}

          {/* Seller info */}
          {item.seller && (<div className="">
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Seller</h3>
            <SellerInfo address={item.seller} />
          </div>)}

          <div className="flex items-center justify-between mt-4">
            <Link href={`/category/${item.category[0]}`} className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-full dark:text-white dark:bg-gray-700">
              <svg className="w-4 h-4 mr-2 -ml-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"></path>
              </svg>
              {item.category}
            </Link>
            <Link href={`/country/${item.country[0]}`} className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-gray-200 rounded-full dark:text-white dark:bg-gray-700" >
              <svg className="w-4 h-4 mr-2 -ml-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"></path>
              </svg>
              {item.country}
            </Link>
          </div>
        </>))}
    </div>
  );
};






export default TradePage;
