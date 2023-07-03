import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import Page404 from './pages/Page404';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
