import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // localStorage.setItem('cart', []);
    let existingCartItem = localStorage.getItem('cart');
    // if (existingCartItem.length > 0) setCart(existingCartItem); this is my mistake, I forgot the data has been stringified
    if (existingCartItem.length > 0)
      setCart(JSON.parse(existingCartItem) || []);
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { CartProvider, useCart };
