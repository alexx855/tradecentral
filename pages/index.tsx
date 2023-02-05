import { NextPageWithLayout } from './_app';
import dynamic from 'next/dynamic';
import Layout from '../components/Layouts/layout';
import { ReactElement } from 'react';
import { GetAllItems } from '../components/BlockchainApi/ListedTokens.jsx';
import Trade from '../components/Trade/TradeCard';
import { useIsMounted } from "../components/Utils/mounted";
import Link from 'next/link';

const TradesListNoSSR = dynamic(() => import('../components/BlockchainApi/listTrades'), {
  ssr: false,
})
const ListCategoriesNoSSR = dynamic(() => import('../components/BlockchainApi/ListCategories'), {
  ssr: false,
})
const ListCountriesNoSSR = dynamic(() => import('../components/BlockchainApi/ListCountries'), {
  ssr: false,
})



interface HomeProps {
}

const HomePage: NextPageWithLayout = (props: HomeProps) => {
  const {data, trades} = GetAllItems();
    const mounted = useIsMounted();

  console.log(trades);
  return (
    <section>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Open <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">trades</mark></h1>
        <p className="font-light mb-8 text-gray-500 sm:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, iure quod? Obcaecati ipsa voluptate eos cumque, ex amet sunt quia tempore sapiente et id, optio aut repellat ad? Sed, maiores?</p>
        {  mounted ? <Trade /> : null}
       
      </div>
      <div className="text-center">
        <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  lg:text-4xl dark:text-white">Explore by Categories</h3>
          <Link href={`/category/`} className="inline-flex items-center px-3 py-1 text-sm font-medium m-3 text-gray-900 bg-gray-200 rounded-full dark:text-white dark:bg-gray-700">
              <svg className="w-4 h-4 mr-2 -ml-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"></path>
              </svg>
              TV/Monitor
            </Link>
      </div>
      <div className="text-center">
        <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  lg:text-4xl dark:text-white">Explore by Countries</h3>
        
     
      </div>
    </section>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default HomePage;
