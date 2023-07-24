import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../utils/Spinner';

const AdminAuth = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('http://localhost:8080/api/auth/admin-auth/');
      if (res.data.ok) {
        // console.log(res.data);
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
export default AdminAuth;
