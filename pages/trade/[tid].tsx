import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import { TradeItemProps } from '../../components/Trade/Trade';
import Trade from '../../components/Trade/Trade';
import { NextPageWithLayout } from '../_app';

export const DUMMY_TRADE_ITEMS: TradeItemProps[] = [
  {
    id: 1,
    buyer: '0x1',
    seller: '0x2',
    price: 100,
    name: 'Trade 1',
    description: 'Trade 1 description',
    image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
    isSold: false
  },
  {
    id: 2,
    buyer: '0x1',
    seller: '0x2',
    price: 100,
    name: 'Trade 2',
    description: 'Trade 2 description',
    image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
    isSold: false
  },
  {
    id: 3,
    buyer: '0x1',
    seller: '0x2',
    price: 100,
    name: 'Trade 3',
    description: 'Trade 3 description',
    image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
    isSold: false
  },
  {
    id: 4,
    buyer: '0x1',
    seller: '0x2',
    price: 100,
    name: 'Trade 4',
    description: 'Trade 4 description',
    image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
    isSold: false
  },
]


const TradePage: NextPageWithLayout<TradeItemProps> = (props) => (
  <section className="p-8">
    <Trade {...props} />
  </section>
)

TradePage.getInitialProps = async (ctx) => {
  // get the query string from context [tid]
  const tid = ctx.query.tid

  if (typeof tid !== 'string') {
    throw new Error('Invalid tid')
  }

  const trade = DUMMY_TRADE_ITEMS.find((trade) => trade.id === +tid)

  if (!trade) {
    throw new Error('Trade not found')
  }

  return trade
}

TradePage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default TradePage