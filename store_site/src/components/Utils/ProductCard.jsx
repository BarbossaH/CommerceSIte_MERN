const ProductCard = ({ product }) => {
  // console.log(product, 12323213213);
  return (
    <div className="card m-2" style={{ width: '12rem' }}>
      <img
        src={`http://127.0.0.1:8080/api/product/product-photo/${product._id}`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
      </div>
    </div>
  );
};
export default ProductCard;
