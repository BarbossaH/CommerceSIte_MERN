import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPwd = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // "proxy": "http://localhost:8080",
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forget-password/`,
        {
          email,
          password: newPwd,
          answer,
        }
      );

      if (res && res.data.success) {
        // console.log(res.data);

        toast.success(res.data && res.data.message);
        // toast.dismiss();

        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'Register -- ECommerce App'}>
      <div className="register">
        <h1>Reset Password</h1>
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
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className="form-control"
              id="inputPassword4"
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPhone" className="form-label">
              Write your favorite thing
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="inputAnswer"
              placeholder="What is your favorite thing?"
              required
            />
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default ResetPwd;
