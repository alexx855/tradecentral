import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import Trade from '../../components/Trade/Trade';
import User, { UserProps } from '../../components/User/User';
import { DUMMY_TRADE_ITEMS } from '../trade/[tid]';
import { NextPageWithLayout } from '../_app';

export const DUMMY_USERS: UserProps[] = [
  {
    id: 1,
    user: 'bonnieg',
    email: 'bonnieg@mail.com',
    name: 'Bonnie Green',
    image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
    description: 'Bonnie drives the technical strategy of the flowbite platform and brand.'
  }
]

const UserPage: NextPageWithLayout<UserProps> = (props) => (
  <section className="p-8">
    <User {...props} />

    <section className="p-6">
      <div className="mx-auto max-w-screen-sm text-center mb-8">
        <h2 className="mb-3 text-3xl lg:text-3xl tracking-tight font-extrabold text-gray-900 ">{props.user} open trades</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {DUMMY_TRADE_ITEMS.map((item) => (<Trade showLink {...item} key={item.id} />))}
      </div>

    </section>

  </section>
)

UserPage.getInitialProps = async (ctx) => {
  const uid = ctx.query.uid

  if (typeof uid !== 'string') {
    throw new Error('Invalid uid')
  }

  const user = DUMMY_USERS.find((user) => user.id === +uid)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default UserPage