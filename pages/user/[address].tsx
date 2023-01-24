import { ReactElement, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../../components/Layouts/layout';
import Trade from '../../components/Trade/Trade';
import User, { UserProps } from '../../components/User/User';
import { DUMMY_TRADE_ITEMS } from '../trade/[tid]';
import { NextPageWithLayout } from '../_app';
import CreateUser from '../../components/BlockchainApi/createUser';
import CreateTrade from '../../components/BlockchainApi/createTrade';


const UserPage: NextPageWithLayout<UserProps> = (props) => {
  const { address, isConnected } = useAccount();
  const [isConnectedUser, setIsConnectedUser] = useState(false);
  useEffect(() => {
    console.log('address', address);
    setIsConnectedUser(address === props.address);
  }, [props.address, address])
  return (
    <section className="p-8">

      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <User {...props} />
        {/* <CreateUser /> */}
        {/* <CreateTrade /> */}
      </div>

      <h3>Your trades</h3>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* TODO: load trades from the blockchaibn on the server */}
        {/* {DUMMY_TRADE_ITEMS.map((item) => (<Trade showLink {...item} key={item.id} />))} */}
      </div>
    </section>
  )
}

UserPage.getInitialProps = async (ctx) => {
  const address = ctx.query.address as string;
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