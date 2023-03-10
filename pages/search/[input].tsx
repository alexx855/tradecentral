import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';
import { normalizeString } from '../../utils';

const SearchResultsNoSSR = dynamic(() => import('../../components/BlockchainApi/SearchResults'), {
  ssr: false,
})

interface SearchPageProps {
  slug: string;
  input: string;
}

const SearchPage: NextPageWithLayout<SearchPageProps> = ({ slug }) => (
  <section>
    <SearchResultsNoSSR name={slug} />
  </section>
)

SearchPage.getInitialProps = async (ctx) => {
  // get the query string from context [input]
  const input = ctx.query.input

  if (typeof input !== 'string' || input.length === 0) {
    throw new Error('Invalid input')
  }

  const props: SearchPageProps = { slug: normalizeString(input), input }
  return props
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default SearchPage