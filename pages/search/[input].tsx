import { NextPage } from 'next'

interface SearchProps {
  input: string;
}

const SearchPage: NextPage<SearchProps> = ({ input }) => (
  <main>
    <h1>Results for {input}</h1>
    <p>TODO: this</p>
  </main>
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

export default SearchPage