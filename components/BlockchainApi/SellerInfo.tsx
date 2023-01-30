
import { Address, useContractRead } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

// return a component with the seller user info
const SellerInfo = ({ address }: { address: Address }) => {

  const { data = false, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    chainId: +CHAIN_ID!,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "userExists",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ]
      }
    ],
    functionName: 'userExists',
    args: [address],
    // onError(err) {
    //   console.log(err)
    // },
    // onSuccess(data) {
    //   console.log(data)
    // }
  })

  const { data: userData = false, isError: userError, isLoading: userLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          }
        ],
        "name": "lookUsers",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "image",
                "type": "string"
              }
            ],
            "internalType": "struct TradeCentral.userData",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    args: [address],
    enabled: !!data,
    functionName: "lookUsers",
  });

  // if (!isLoading)
  //   return (<div>Loading...</div>)

  // if (isError)
  //   return (<div>Error</div>)

  return (
    <div>
      <div className="flex  items-center">
        <Link href={`/user/${address}`}>
          {userData && userData.image !== "" ? (
            <Image width={40} height={40} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={userData.image} alt="User avatar" />
          ) : (
            <span className="inline-block relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </span>
          )}
        </Link>
        <div className='pl-2'>
          <p className="text-base mb-0 font-semibold leading-none text-gray-900 dark:text-white">
            <Link href={`/user/${address}`}>{userData && userData.name ? userData.name : address}</Link>
          </p>
          {userData && userData.email && (<p className="mb-0 text-sm font-normal">
            <Link target="_blank" href={`mailto:${userData.email}`} className="hover:underline">{userData.email}</Link>
          </p>)}
        </div>
      </div>

      {/* TODO: reviews */}
      <div className="flex items-center  text-sm font-light">
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
        <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
      </div>
    </div >
  );
};

export default SellerInfo;