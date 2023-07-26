import { useCart } from '../../context/CartContext';
import React from 'react';
const ButtonAddToCart = ({ product }) => {
  const [cart, setCart] = useCart();
  const handleAddToCart = () => {
    // const isExist = cart?.some((p) => p._id === product._id);
    const isExistProduct = cart?.find((p) => p._id === product._id);
    let newCart = [...cart];
    if (isExistProduct) {
      isExistProduct.quantity += 1;
      // newCart = [...cart, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    console.log(newCart);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  return (
    <button className="btn btn-secondary " onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};
export default React.memo(ButtonAddToCart);
