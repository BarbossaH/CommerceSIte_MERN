import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/Auth';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={'Home Page'}>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};
export default HomePage;
