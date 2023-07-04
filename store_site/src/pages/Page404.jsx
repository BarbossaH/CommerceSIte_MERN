import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
const Page404 = () => {
  return (
    <Layout title={'Back to Homepage'}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Page Not Found</h2>
        <Link to={'/'} className="pnf-btn">
          Home Page
        </Link>
      </div>
    </Layout>
  );
};
export default Page404;
