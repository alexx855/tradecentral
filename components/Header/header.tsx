import dynamic from 'next/dynamic';
import Link from 'next/link';
import Search from '../Search/Search';

const AccountNoSSR = dynamic(() => import('../Account/Account'), {
  ssr: false,
})

const Header = () => {
  return (
    <>
      <div className="mx-auto max-w-[1200px]">
        <header className="">
          <div className="flex justify-between items-center p-3">
            <Link href="/" className="mr-3 flex items-center">
              TradeCentral
            </Link>

            <div className="relative z-10 flex grow items-center">
              <Search />
            </div>

            <div className="ml-3 items-center">
              <AccountNoSSR />
            </div>

          </div>
        </header>
      </div>
    </>
  );
};


export default Header;
