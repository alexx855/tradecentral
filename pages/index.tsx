import { ReactElement } from 'react';
import Layout from '../components/Layouts/layout';
import TradeItem from '../components/Trade/Trade';
import Modal from '../components/TradeModal/TradeModal';
import { DUMMY_TRADE_ITEMS } from './trade/[tid]';
import { NextPageWithLayout } from './_app';
import {useIsMounted} from "../components/Utils/mounted";
import {CreateUser} from "../components/BlockchainApi/createUser"

interface HomeProps {
}

const HomePage: NextPageWithLayout = (props: HomeProps) => {
  const mounted = useIsMounted();
  return (
    <section className="p-8">
      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <h2 className="mb-3 text-3xl lg:text-3xl tracking-tight font-extrabold text-gray-900 ">Open Trades</h2>
        <p className="font-light text-gray-500 sm:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, iure quod? Obcaecati ipsa voluptate eos cumque, ex amet sunt quia tempore sapiente et id, optio aut repellat ad? Sed, maiores?</p>
      </div>

      <div className="flex justify-center m-5"> 
        <Modal/>
        {/* {mounted ? <CreateUser/> : null} */}
        
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {DUMMY_TRADE_ITEMS.map((item) => (<TradeItem showLink showUser {...item} key={item.id} />))}
      </div>
    </section>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

HomePage.getInitialProps = async (ctx) => {
  return {}
}

export default HomePage;
