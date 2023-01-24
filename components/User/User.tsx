
import Image from 'next/image';

export interface UserProps {
  address: string;
  email?: string;
  name?: string;
  image?: string;
  description?: string;
}

const User = (props: UserProps) => {
  const image = props.image || 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png';
  return (
    <article>
      <div className="items-center flex">
        <Image width={100} height={100} src={image} alt={`${props.address}`} />
        <div className="p-5">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
            {props.address}
          </h3>
          <span className="text-gray-500 ">{props.name}</span>
          {props.description && (<p className="mt-3 mb-4 font-light text-gray-500 ">{props.description}</p>)}
        </div>
      </div>
    </article>
  );
};

export default User;