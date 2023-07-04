import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    console.log(123);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login/', {
        email,
        password,
      });

      if (res?.data.success) {
        toast.success(res?.data.message);

        // console.log(res.data);
        // const user = res.data.user;
        // const token = res.data.token;
        // setAuth({ user, token });
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem('auth', JSON.stringify(res.data));
        toast.dismiss();
        navigate('/');
      } else {
        toast.error(res?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={'Login -- ECommerce App'}>
      <div className="register">
        <h1>Login</h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="inputEmail"
              placeholder="Enter your email"
              required
            />
          </div>{' '}
          <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="inputPassword4"
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default Login;
