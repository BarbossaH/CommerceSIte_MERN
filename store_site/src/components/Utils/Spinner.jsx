import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
const Spinner = () => {
  const [count, setCount] = useState(3);
  const nav = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && nav('/login');
    return () => clearInterval(interval);
  }, [count, nav]);
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
