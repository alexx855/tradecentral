import { ReactElement } from 'react';
import Layout from '../components/Layouts/layout';
import { NextPageWithLayout } from './_app';

interface HomeProps {
}

const HomePage: NextPageWithLayout = (props: HomeProps) => {
  return (
    <div className='p-3'>
      TODO: define home page content,  list all available trades?
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (<Layout>{page}</Layout>)
}


HomePage.getInitialProps = async (ctx) => {
  return {}
}
export default HomePage;
