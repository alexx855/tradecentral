import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Link from 'next/link';
import Account from '../components/Account/Account';
import Search from '../components/Search/Search';

const Home: NextPage = () => {
  return (
    <>

      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <header className="">
          <div className="flex justify-between items-center p-3">
            <Link href="/" className="mr-3 flex items-center">
              TradeCentral
            </Link>

            <div className="relative z-10 flex grow items-center">
              <Search />
            </div>

            <div className="ml-3 items-center w-[90px]">
              <Account />
            </div>

          </div>
        </header>

      </div>
    </>
  );
};

export default Home;
