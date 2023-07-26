const ImageOfProduct = ({ productID, productName, width, height }) => {
  // console.log(width, height);
  return (
    <img
      src={`http://127.0.0.1:8080/api/product/product-photo/${productID}`}
      className="img img-responsive"
      alt={productName}
      width={width ?? '100%'}
      height={height ?? '100%'}
    />
  );
};
export default ImageOfProduct;
