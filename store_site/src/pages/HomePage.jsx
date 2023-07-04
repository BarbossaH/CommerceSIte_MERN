import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={'Home Page'}>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};
export default HomePage;
