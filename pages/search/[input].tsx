import { ReactElement } from 'react';
import Layout from '../../components/Layouts/layout';
import { NextPageWithLayout } from '../_app';

interface SearchProps {
  input: string;
}

const SearchPage: NextPageWithLayout<SearchProps> = ({ input }) => (
  <>
    <div className='p-3'>
      <h1>Results for {input}</h1>
      <p>TODO: list search results</p>
    </div>
  </>
)

SearchPage.getInitialProps = async (ctx) => {
  // get the query string from context [input]
  const input = ctx.query.input

  if (typeof input !== 'string' || input.length === 0) {
    throw new Error('Invalid input')
  }

  const props: SearchProps = { input }
  return props
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}

export default SearchPage