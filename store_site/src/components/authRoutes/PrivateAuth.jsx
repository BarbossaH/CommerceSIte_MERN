import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../utils/Spinner';

//using this component as the parent component which need to check the user login or not, and then navigate to the corresponding page.
// in this component, all need do is check the login status, and based on the status, jump to the page
const PrivateAuth = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('http://localhost:8080/api/auth/user-auth/');
      if (res.data.ok) {
        console.log(res.data);
        setOk(true);
      } else {
        console.log(res.data);

        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};
export default PrivateAuth;
