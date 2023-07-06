import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import Page404 from './pages/Page404';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/UserDashboard';
import PrivateAuth from './components/authRoutes/PrivateAuth';
import ResetPwd from './pages/auth/ResetPwd';
import AdminAuth from './components/authRoutes/AdminAuth';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import AllUser from './pages/admin/AllUser';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<PrivateAuth />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminAuth />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/all-users" element={<AllUser />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ResetPwd />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
