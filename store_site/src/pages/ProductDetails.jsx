import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../components/utils/ProductCard';
import ButtonAddToCart from '../components/utils/ButtonAddtoCart';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarPros, setSimilarPros] = useState([]);
  // console.log(slug);

  useEffect(() => {
    if (slug) {
      getProductDetails();
    }
  }, [slug]);
  const getSimilarPros = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/product/get-similar-products/${pid}/${cid}`
      );
      // console.log(data);
      setSimilarPros(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/product/get-product/${slug}`
      );
      // console.log(data);
      setProduct(data?.product);
      getSimilarPros(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={'Product-Details'}>
      <div className="row container mt-3">
        <div className="col-md-5">
          {product._id && (
            <img
              src={`http://127.0.0.1:8080/api/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          )}
        </div>
        <div className="col-md-7 ">
          <h1 className="">Product Details</h1>
          <h6>Name : {product?.name}</h6>
          <h6>Description : {product?.description}</h6>
          <h6>Price : {product?.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <h6>Shipping : {product?.shipping}</h6>
          <ButtonAddToCart />
        </div>
      </div>
      <div className="row">
        <div className="mt-3" style={{ border: '0.5px green solid' }}></div>
        <h1 className="text-center">Similar Product</h1>
        <div className="d-flex flex-wrap">
          {similarPros.length < 1 ? (
            <p>'No Similar Products'</p>
          ) : (
            similarPros?.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                needBtn={false}
                btnAdd={true}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};
export default ProductDetails;
