import { ReactElement, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../../components/Layouts/layout';
import User, { UserProps } from '../../components/User/User';
import { NextPageWithLayout } from '../_app';
import Trade, { TradeProps } from '../../components/Trade/Trade';
import CreateUser from '../../components/BlockchainApi/createUser';
// import UpdateUser from '../../components/BlockchainApi/updateUser';
// import CreateTrade from '../../components/BlockchainApi/createTrade';
// import buyTrade from '../../components/BlockchainApi/buyTrade';

// TODO: remove this dummy data, load trades from the blockchain
import { DUMMY_TRADE_ITEMS } from '../trade/[tid]';

const UserPage: NextPageWithLayout<UserProps> = (props) => {
  const { address, isConnected } = useAccount();
  const [isConnectedUser, setIsConnectedUser] = useState(false);
  const [userTrades, setUserTrades] = useState<TradeProps[]>([]);

  useEffect(() => {
    setIsConnectedUser(address === props.address);
  }, [props.address, address])

  /* TODO: load trades from the blockchaibn on the server */
  useEffect(() => {
    setUserTrades(DUMMY_TRADE_ITEMS);
  }, [])

  return (
    <section className="p-8">

      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <User {...props} />
        {isConnectedUser && (<div className='mb-10'>
          {/* <CreateUser />
          <CreateTrade /> */}
        </div>)}
      </div>

      <h3>{isConnectedUser ? 'Your' : props.address} trades</h3>
      <div className="grid gap-8 lg:grid-cols-2">
        {userTrades && userTrades.map((trade: any) => (
          <Trade showLink {...trade} key={trade.id} />)
        )}
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