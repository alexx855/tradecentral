
import Image from 'next/image';
import Link from 'next/link';

export interface TradeProps {
  id: number;
  buyer: string;
  seller: string;
  price: number;
  name: string;
  description: string;
  image: string;
  isSold: boolean;
  showUser?: boolean;
  showLink?: boolean;
}

const Trade = (props: TradeProps) => {
  const image = props.image || 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png';
  return (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md  ">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
          Tag
        </span>
        <span className="text-sm">14 days ago</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        {props.showLink ? (<Link href={`/trade/${props.id}`}>{props.name}</Link>) : props.name}
      </h2>
      <p className="mb-5 font-light text-gray-500">{props.description}</p>
      <div className="flex justify-between items-center">
        {props.showUser && (<div className="flex items-center space-x-3">
          <Link href={`/user/${props.id}`} className="flex items-center space-x-2">
            <Image width={20} height={20} className="rounded-full" src={image} alt={props.seller} />
            <span className="font-medium ">{props.seller}</span>
          </Link>
        </div>)}

        {props.showLink && (<Link href={`/trade/${props.id}`} className="inline-flex items-center font-medium text-yellow-600 -500 hover:underline">
          Read more
          <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link>)}
      </div>
    </article>
  );
};

export default Trade;