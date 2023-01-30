import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import UserProfile, { UserProps } from '../../components/User/User';
import { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';
import { Address } from 'wagmi';

const TradesListNoSSR = dynamic(() => import('../../components/BlockchainApi/listTrades'), {
  ssr: false,
})

const UserPage: NextPageWithLayout<UserProps> = (props) => {

  return (
    <section className="p-8">
      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <UserProfile {...props} />
      </div>
      <h1 className=" text-center w-full mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">User <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">trades</mark></h1>
      <div className="grid gap-8 ">
        <TradesListNoSSR user={props.address} filterClosed={false} />
      </div>
    </section>
  )
}

UserPage.getInitialProps = async (ctx) => {
  const address = ctx.query.address as Address;
  // TODO: fetch user data from backend, email, name and avatar image.

  const user: UserProps = {
    address
  }

  // TODO: fetch user data from backend
  return user
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default UserPage