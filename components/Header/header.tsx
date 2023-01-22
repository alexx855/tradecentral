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
        <header className="pt-2 px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="mr-4 flex items-center">
              TradeCentral
            </Link>

            <div className="relative z-10 flex grow items-center">
              <Search />
            </div>

            <div className="ml-4 items-center">
              <AccountNoSSR />
            </div>

          </div>
        </header>
      </div>
    </>
  );
};


export default Header;
