import { ReactElement } from 'react';
import Layout from '../components/Layouts/layout';
import TradeCard from '../components/Trade/Trade';
import { NextPageWithLayout } from './_app';
import { useContractRead } from 'wagmi'
import { BigNumber } from 'ethers';
import dynamic from 'next/dynamic';
import Balance from '../components/BlockchainApi/balance';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const TradesListNoSSR = dynamic(() => import('../components/BlockchainApi/listTrades'), {
  ssr: false,
})

interface HomeProps {
}

const HomePage: NextPageWithLayout = (props: HomeProps) => {
  return (
    <section className="p-8">
      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <h2 className="mb-3 text-3xl lg:text-3xl tracking-tight font-extrabold text-gray-900 ">Open Trades</h2>
        <p className="font-light text-gray-500 sm:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, iure quod? Obcaecati ipsa voluptate eos cumque, ex amet sunt quia tempore sapiente et id, optio aut repellat ad? Sed, maiores?</p>
      </div>

      <div className="">
        <TradesListNoSSR />
      </div>
    </section>
  );
};

// HomePage.getLayout = function getLayout(page: ReactElement) {
//   return (<Layout>{page}</Layout>)
// }

// // TODO: load trades from the backend
// HomePage.getInitialProps = async (ctx) => {
// }

export default HomePage;
