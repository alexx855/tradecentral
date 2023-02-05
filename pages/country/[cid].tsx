import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';

const SearchResultsNoSSR = dynamic(() => import('../../components/BlockchainApi/SearchResults'), {
  ssr: false,
})

const SearchPage: NextPageWithLayout<{ country: string }> = ({ country }) => (
  <section>
    <SearchResultsNoSSR country={country} />
  </section>
)

SearchPage.getInitialProps = async (ctx) => {
  // get the query string from context [input]
  const country = ctx.query.cid

  if (typeof country !== 'string' || country.length === 0) {
    throw new Error('Invalid country')
  }

  return { country }
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default SearchPage