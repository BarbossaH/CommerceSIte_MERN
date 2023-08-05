import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  console.log(auth);
  useEffect(() => {
    const {
      user: { email, address, name, phone },
    } = auth;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // "proxy": "http://localhost:8080",
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/auth//update-profile/`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (data && data.error) {
        console.log(data.error);
        // toast.dismiss();
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('SUCCESSFULLY');
        navigate('/dashboard/user');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={'Orders-Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Profile</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="inputName"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="inputPassword4"
                />
              </div>
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
                  disabled
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="inputPhone"
                  placeholder="Enter your phone"
                  required
                />
              </div>
              {/* <div className="col-12">
                <label htmlFor="inputPhone" className="form-label">
                  Write your favorite thing.
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
              </div> */}
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="inputAddress"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
