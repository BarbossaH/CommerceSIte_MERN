import { useEffect, useState } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import ImageOfProduct from '../../components/utils/ImageOfProduct';
const { Option } = Select;

const UpdateProduct = () => {
  const { slug } = useParams();
  // console.log(slug, 9999);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [productID, setProductID] = useState('');

  const getAllCategories = async () => {
    try {
      // console.log('preparing1');
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/category/get-all-category'
      );

      if (data?.success) {
        setCategories(data?.categories);
        // console.log('refresh');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };
  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, []);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/product//get-product/${slug}`
      );
      if (data.success) {
        setName(data.product.name);
        // console.log(data.product, 90909090);
        setCategoryID(data.product.category._id);
        setProductID(data.product._id);
        setPrice(data.product.price);
        setDescription(data.product.description);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProduct = async () => {
    // e.preventDefault();
    try {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price);
      product.append('quantity', quantity);
      photo && product.append('photo', photo);
      // console.log(categories, categoryID);
      product.append('category', categoryID);
      product.append('shipping', shipping);

      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/product/update-product/${productID}`,
        product
      );
      if (data.success) {
        toast.success(`${name} updated successfully`);
        navigate('/dashboard/admin/get-products');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      let confirm = window.prompt(`Input ${name} to delete ?`);
      if (confirm !== name) return;
      const { data } = await axios.delete(
        `http://127.0.0.1:8080/api/product/delete-product/${productID}`
      );
      if (data.success) {
        toast.success(data.message);
        navigate('/dashboard/admin/get-products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'Update-Admin-Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={categoryID}
                onChange={(value) => {
                  // console.log(value, '0000000');
                  setCategoryID(value);
                }}
              >
                {/* {console.log(categories)} */}
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label
                  // htmlFor="upload images"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo?.name : 'Upload a photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3" style={{ border: '1px solid green' }}>
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                ) : productID ? (
                  <div className="text-center">
                    {/* {console.log(productID, 9090909091)} */}
                    <ImageOfProduct
                      productID={productID}
                      productName={name}
                      height={'200px'}
                      width={'200px'}
                    />
                    {/* <img
                      src={`http://127.0.0.1:8080/api/product/product-photo/${productID}`}
                      className="img img-responsive"
                      height={'200px'}
                      alt={name}
                    /> */}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    placeholder="Enter the product name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write description"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Price</label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={price}
                    placeholder="Enter the price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Shipping</label>
                <div className="col-sm-10">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="small"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping}
                  >
                    <Option value={false}>No</Option>
                    <Option value={true}>Yes</Option>
                  </Select>
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-evenly ">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UpdateProduct;
