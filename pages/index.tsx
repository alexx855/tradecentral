import { NextPageWithLayout } from './_app';
import dynamic from 'next/dynamic';
import Layout from '../components/Layouts/layout';
import { ReactElement } from 'react';

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
  return (
    <section>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Open <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">trades</mark></h1>
        <p className="font-light mb-8 text-gray-500 sm:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, iure quod? Obcaecati ipsa voluptate eos cumque, ex amet sunt quia tempore sapiente et id, optio aut repellat ad? Sed, maiores?</p>
        <div>
          <TradesListNoSSR />
        </div>
      </div>
      <div className="text-center">
        <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  lg:text-4xl dark:text-white">Explore by Categories</h3>
        <ListCategoriesNoSSR />
      </div>
      <div className="text-center">
        <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  lg:text-4xl dark:text-white">Explore by Countries</h3>
        <ListCountriesNoSSR />
      </div>
    </section>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default HomePage;
