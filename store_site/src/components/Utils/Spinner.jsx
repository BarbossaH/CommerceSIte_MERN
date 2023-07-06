import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
const Spinner = ({ path = 'login' }) => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Layout>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: '70vh' }}
      >
        <h1 className="Text-center">Redirecting to Login in {count} seconds</h1>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Layout>
  );
};
export default Spinner;
