import { useEffect, useState } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';
const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [productId, setProductId] = useState(null);
  const [visible, setVisible] = useState(false);
  //get all categories

  const getAllCategories = async () => {
    try {
      console.log('preparing1');
      const { data } = await axios.get(
        'http://127.0.0.1:8080/api/category/get-all-category'
      );

      if (data.success) {
        console.log('preparing');

        setCategory(data.categories);
        console.log('refresh');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name);
    try {
      const { data } = await axios.post(
        'http://127.0.0.1:8080/api/category/create-category',
        { name }
      );
      if (data?.success) {
        getAllCategories();
        setName('');
        // console.log(data);
        toast.success(`${data?.category?.name} has been created.`);
      }
    } catch (error) {
      console.log(error);
      // toast.error('Cannot create the category.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/category/update-category/${productId}`,
        { name: updateName }
      );
      if (data.success) {
        setUpdateName('');
        setVisible(false);
        setProductId(null);
        getAllCategories();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Update went wrong');
    }
  };

  const handleDelete = async (name, _id) => {
    try {
      // http://127.0.0.1:8080/api/v1/category/delete-category/64a7614c5b893adedb29e6fb
      const { data } = await axios.delete(
        `http://127.0.0.1:8080/api/category/delete-category/${_id}`
      );
      if (data.success) {
        getAllCategories();
        toast.success(`${name} deleted Successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Delete went wrong');
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={'Category-Admin-Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category </h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c, index) => (
                    <tr key={c._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary  ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(c.name);
                            setProductId(c._id);
                          }}
                        >
                          Edit
                        </button>{' '}
                        &nbsp;
                        <button
                          className="btn btn-danger  ms-2"
                          onClick={() => {
                            handleDelete(c.name, c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
            {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modal> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateCategory;
