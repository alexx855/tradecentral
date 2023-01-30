import { NextPageWithLayout } from './_app';
import dynamic from 'next/dynamic';

const TradesListNoSSR = dynamic(() => import('../components/BlockchainApi/listTrades'), {
  ssr: false,
})

interface HomeProps {
}

const HomePage: NextPageWithLayout = (props: HomeProps) => {
  return (
    <section className="p-8">
      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Open <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">trades</mark></h1>
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
