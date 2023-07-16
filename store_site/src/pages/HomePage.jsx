import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../components/utils/ProductCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  console.log(auth, "what's this");
  const getAllProducts = async () => {
    // the photo images are retrieved individually from database
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/product/get-all-products'
      );
      if (data.success) {
        setProducts(data.products);
        console.log(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Getting products went wrong');
    }
  };

  useEffect(() => {
    //if getting products need authorization, even though the local storage has the token, the header including authorization has to be set up because the context provider is not ready yet, which needs sometimes.
    getAllProducts();
  }, []);
  return (
    <Layout title={'Home Page'}>
      <div className="row " style={{ marginTop: '30px' }}>
        <div
          className="col-md-3 d-flex align-item-center justify-content-center"
          style={{ border: '1px solid green' }}
        >
          <h4
            className="text-center d-flex align-items-center m-0"
            // style={{ border: '1px solid red' }}
          >
            Filter By Category
          </h4>
        </div>
        <div className="col-md-9 " style={{ border: '1px solid green' }}>
          <h1 className="text-center m-0">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                className="product-link"
                key={p._id}
                to={`/dashboard/admin/update-product/${p.slug}`}
              >
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
