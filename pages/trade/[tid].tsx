import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import Trade, { TradeProps } from '../../components/Trade/Trade';
import { NextPageWithLayout } from '../_app';

const TradePage: NextPageWithLayout<TradeProps> = (props) => (
  <section className="p-8">
    <Trade {...props} />
  </section>
)

// TradePage.getInitialProps = async (ctx) => {
//   // get the query string from context [tid]
//   const tid = ctx.query.tid

//   if (typeof tid !== 'string') {
//     throw new Error('Invalid tid')
//   }

//   const trade = DUMMY_TRADE_ITEMS.find((trade) => trade.id === +tid)

//   if (!trade) {
//     throw new Error('Trade not found')
//   }

//   return trade
// }

TradePage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default TradePage