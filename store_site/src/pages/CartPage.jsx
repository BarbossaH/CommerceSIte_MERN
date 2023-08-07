import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ImageOfProduct from '../components/utils/ImageOfProduct';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';

const CartPage = () => {
  //all products in cart should be read in local storage first.
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [paymentToken, setPaymentToken] = useState('');
  const [payInstance, setPayInstance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/product//braintree/token'
      );
      // console.log(data);
      setPaymentToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price * item.quantity;
    });
    return total.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleRemoveItem = (pid) => {
    try {
      // let myCart = [...cart];
      // let index = myCart.findIndex((item) => item._id === pid);
      // myCart.splice(index, 1);
      // setCart(myCart);
      let newCart = cart.filter((item) => item._id !== pid);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.log(error);
    }
  };
  const handlePay = async () => {
    try {
      setIsLoading(true);
      const { nonce } = await payInstance.requestPaymentMethod();
      // console.log(nonce);
      const { data } = await axios.post(
        'http://127.0.0.1:8080/api/product//braintree/payment',
        { nonce, cart }
      );
      // console.log(data);

      setIsLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      // console.log(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Layout title={'Cart'}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">{`Hello ${
              auth?.token ? auth?.user?.name : ''
            }`}</h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? ' ' : 'Please login to checkout'
                  }`
                : 'Your cart is empty'}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart &&
              cart?.map((p) => (
                <div className="row mb-2 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <ImageOfProduct productID={p._id} productName={p.name} />
                  </div>
                  <div className="col-md-8 p-3">
                    <h3 className="">Product Details</h3>
                    <h6>Name : {p?.name}</h6>
                    <h6>Description : {p?.description}</h6>
                    <h6>Price : {p?.price}</h6>
                    <h6>Count : {p?.quantity}</h6>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate('/login')}
                >
                  Login to Checkout
                </button>
              </div>
            )}
            <div className="mt-2">
              {!paymentToken || !cart?.length ? (
                ''
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: paymentToken,
                      paypal: { flow: 'vault' },
                    }}
                    onInstance={(instance) => setPayInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePay}
                    disabled={isLoading || !payInstance || !auth?.user?.address}
                  >
                    {console.log(isLoading, payInstance, auth?.user?.address)}
                    {isLoading ? 'Processing ...' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CartPage;
