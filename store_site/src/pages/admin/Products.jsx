import { useEffect, useState } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../../components/utils/ProductCard';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    // the photo images are retrieved individually from database
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/product/get-all-products'
      );
      if (data.success) {
        setProducts(data.products);
        // toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Getting products went wrong');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [products]);
  return (
    <Layout title={'Products-Admin-Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products </h1>
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
      </div>
    </Layout>
  );
};
export default Products;
