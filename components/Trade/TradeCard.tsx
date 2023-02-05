
import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import tradePlaceholderPic from '../../public/image-1@2x.jpg'

export interface TradeProps {
  id: BigNumber;
  buyer: `0x${string}`;
  seller: `0x${string}`;
  price: BigNumber;
  description: string;
  image: string;
  name: readonly string[];
  category: readonly string[];
  country: readonly string[];
  isSold: boolean;
  showUser?: boolean;
  showLink?: boolean;
}

const Trade = (props: TradeProps) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-[400px] relative">
      <Link href={`/trade/${props.id}`} >
          <Image
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="w-full object-fill h-auto mb-4"
            src={props.image.length > 0 ? `https://gateway.lighthouse.storage/ipfs/${props.image}` : tradePlaceholderPic}
            alt={`${props.name[1]} image`}
          />
      </Link>
      </div>
      <div className="px-5 py-5">
        <Link href={`/trade/${props.id}`} >
          <h5 className="text-xl mb-4 font-semibold tracking-tight text-gray-900 dark:text-white">{props.name[1]}</h5>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">Ξ{`${utils.formatUnits(props.price).slice(0, 6)}`}</span>
          <Link href={`/trade/${props.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
            Read more
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trade;