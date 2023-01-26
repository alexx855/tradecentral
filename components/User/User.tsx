
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export interface UserProps {
  address: string;
  email?: string;
  name?: string;
  image?: string;
  description?: string;
}

const User = (props: UserProps) => {
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount();
  const [showDisconnect, setShowDisconnect] = useState(false);
  useEffect(() => {
    setShowDisconnect(isConnected && address === props.address);
  }, [props.address, address, isConnected])

  // TODO: create a custom placeholder image for the project
  const image = props.image || 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png';
  return (
    <article>
      <div className="items-center flex">
        {/* TODO: load avatar from blockchain */}
        <Image width={100} height={100} src={image} alt={`${props.address}`} />
        <div className="p-5">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
            {props.address}
          </h3>
          {showDisconnect && (
            <button onClick={() => disconnect()} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Disconnect
              </span>
            </button>
          )}
          {props.name && (<span className="text-gray-500 ">{props.name}</span>)}
          {props.description && (<p className="mt-3 mb-4 font-light text-gray-500 ">{props.description}</p>)}
        </div>
      </div>
    </article>
  );
};

export default User;