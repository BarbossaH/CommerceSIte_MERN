import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ProductCard from '../components/utils/ProductCard';
import { Checkbox, Radio } from 'antd';
import { Price } from '../config/Price';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const getAllCategories = async () => {
    try {
      // console.log('preparing1');
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/category/get-all-category'
      );

      if (data?.success) {
        setCategories(data?.categories);
        // console.log(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllProducts = async () => {
    // the photo images are retrieved individually from database
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/product/get-all-products'
      );
      if (data.success) {
        setProducts(data.products);
        console.log(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Getting products went wrong');
    }
  };

  useEffect(() => {
    //if getting products need authorization, even though the local storage has the token, the header including authorization has to be set up because the context provider is not ready yet, which needs sometimes.
    if (!checked.length > 0 && !radio.length > 0) {
      getAllProducts();
      console.log('11111');
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      console.log('2222');

      filterProducts();
    }
  }, [checked, radio]);
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        'http://127.0.0.1:8080/api/product/product-filters',
        { checked, radio }
      );
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckCategory = (_checked, _id) => {
    let all = [...checked];
    if (_checked) {
      all.push(_id);
    } else {
      all = all.filter((id) => id !== _id);
    }
    setChecked(all);
  };
  return (
    <Layout title={'Home Page'}>
      <div className="row " style={{ marginTop: '30px' }}>
        <div className="col-md-3 " style={{ border: '1px solid green' }}>
          <div>
            <h4 className="text-center" style={{ border: '1px solid red' }}>
              Filter By Category
            </h4>
            <div className="d-flex flex-column p-3">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheckCategory(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-center" style={{ border: '1px solid red' }}>
              Filter By Price
            </h4>
            <div className="d-flex flex-column p-3">
              <Radio.Group
                className="d-flex flex-column"
                onChange={(e) => setRadio(e.target.value)}
              >
                {Price?.map((p) => (
                  <Radio key={p._id} value={p.range}>
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className="col-md-9 " style={{ border: '1px solid green' }}>
          <h1 className="text-center m-0">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <ProductCard key={p._id} product={p} needBtn={true} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
