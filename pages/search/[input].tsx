import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import Trade, { TradeProps } from '../../components/Trade/Trade';
import User, { UserProps } from '../../components/User/User';
import { NextPageWithLayout } from '../_app';

interface SearchPageProps {
  input: string;
  resultsCount: number;
  results: UserProps[] | TradeProps[]
}

const NoResults = () => (
  <div className="mx-auto max-w-screen-sm text-center">
    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Sorry, we can't find anything. </p>
    <p className="mb-4 text-lg font-light text-gray-500">You'll find lots to explore on the home page. </p>
    <Link href="/" className="inline-flex text-white bg-yellow-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark my-4">Back to Homepage</Link>
  </div>
)

const SearchPage: NextPageWithLayout<SearchPageProps> = ({ input, resultsCount, results }) => (
  <section className="p-8">
    {resultsCount > 0 ? (
      <>
        <h1>{resultsCount} results for <strong>{input}</strong></h1>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {results.map((result) => {
            if ('user' in result) {
              return (<User {...result} key={result.id} />)
            }
            return (<Trade {...result} key={result.id} />)
          })}
        </div>
      </>
    ) : <NoResults />}
  </section>
)

SearchPage.getInitialProps = async (ctx) => {
  // get the query string from context [input]
  const input = ctx.query.input

  if (typeof input !== 'string' || input.length === 0) {
    throw new Error('Invalid input')
  }

  const resultsCount = 0
  const results: UserProps | TradeProps[] = []

  const props: SearchPageProps = { input, resultsCount, results }
  return props
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default SearchPage