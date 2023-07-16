import { useEffect, useState } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');

  const canCreate =
    categoryID && name && description && price && photo && quantity && shipping;
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
    getAllCategories();
  }, []);

  const handleCreateProduct = async () => {
    // e.preventDefault();
    try {
      const product = new FormData();
      product.append('name', name);
      product.append('description', description);
      product.append('price', price);
      product.append('quantity', quantity);
      product.append('photo', photo);
      product.append('shipping', shipping);
      // console.log(category, 'tetetetee');
      product.append('category', categoryID);
      // product.append('shipping', shipping);

      const { data } = await axios.post(
        'http://127.0.0.1:8080/api/product/create-product',
        product
      );
      if (data.success) {
        toast.success(`${name} created successfully`);
        navigate('/dashboard/admin/get-products');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };
  return (
    <Layout title={'Product-Admin-Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategoryID(value)}
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
                  {photo ? photo.name : 'Upload a photo'}
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
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
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateProduct}
                  disabled={!canCreate}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProduct;
