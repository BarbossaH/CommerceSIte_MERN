import Layout from '../components/layout/Layout';
import ImageOfProduct from '../components/utils/ImageOfProduct';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  //all products in cart should be read in local storage first.

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

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
          <div className="col-md-8">
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
          <div className="col-md-4">Checkout | Payment</div>
        </div>
      </div>
    </Layout>
  );
};
export default CartPage;
