import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';

const SearchResultsNoSSR = dynamic(() => import('../../components/BlockchainApi/SearchResults'), {
  ssr: false,
})

const SearchPage: NextPageWithLayout<{ category: string }> = ({ category }) => (
  <section>
    <SearchResultsNoSSR category={category} />
  </section>
)

SearchPage.getInitialProps = async (ctx) => {
  // get the query string from context [input]
  const category = ctx.query.cid

  if (typeof category !== 'string' || category.length === 0) {
    throw new Error('Invalid category')
  }

  return { category }
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default SearchPage