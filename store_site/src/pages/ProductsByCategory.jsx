import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/utils/ProductCard';

const ProductsByCategory = () => {
  const { slug } = useParams();
  console.log(slug);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getProductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/product/get-category-products/${slug}`
      );
      setLoading(false);
      setTotal(data.total);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getProductsByCat();
    }
  }, [slug]);
  return (
    <Layout>
      <div style={{ border: '1px red solid' }} className="container">
        <h1>Products of {slug}</h1>
        <div className="row">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                needBtn={true}
                btnAdd={true}
              />
            ))
          ) : (
            // <div>{products.length}</div>
            <div>No products</div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default ProductsByCategory;
