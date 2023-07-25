import { useNavigate } from 'react-router-dom';
import ButtonAddToCart from './ButtonAddtoCart';

const ProductCard = ({ product, needBtn, btnAdd }) => {
  const navigate = useNavigate();
  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img
        src={`http://127.0.0.1:8080/api/product/product-photo/${product._id}`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{`Product: ${product.name}`}</h5>
        <p className="card-text">
          {product.description.length > 30
            ? `Des: ${product.description.substring(0, 24)}...`
            : product.description}
        </p>
        <p className="card-text">{`Price: $ ${product.price}`}</p>

        <div className="d-flex justify-content-around m-0">
          {needBtn && (
            <button
              className="btn btn-primary "
              onClick={() => navigate(`/product-details/${product.slug}`)}
            >
              More Details
            </button>
          )}
          {btnAdd && <ButtonAddToCart />}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
