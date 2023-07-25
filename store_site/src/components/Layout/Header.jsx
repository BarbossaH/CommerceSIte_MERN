import { NavLink, Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../../hooks/useCategory';

const Header = () => {
  const [auth, setAuth] = useAuth();
  // console.log(auth);
  const categories = useCategory();
  // console.log(categories);
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({ ...auth, user: null, token: null });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand">
            <FaShoppingBag style={{ marginRight: '3px' }} />
            ECommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link" to={'/'}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={'/categories'}>
                    All Categories
                  </Link>
                  {categories?.map((c) => (
                    <li key={c.name}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to={'/register'} className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      // onClick={handleLogout}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ border: 'none' }}
                    >
                      {auth.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      // aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? 'admin' : 'user'
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={'/login'}
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                      {/* <li>
                        <hr className="dropdown-divider" />
                      </li> */}
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to={'/cart'} className="nav-link">
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
