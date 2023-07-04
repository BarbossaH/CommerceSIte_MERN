import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  axios.defaults.headers.common['Authorization'] = auth?.token;

  useEffect(() => {
    console.log('useEffect');
    const data = localStorage.getItem('auth');
    if (data) {
      // console.log(data);
      const parsedData = JSON.parse(data);
      // console.log(parsedData);
      setAuth({ ...auth, user: parsedData.user, token: parsedData.token });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
