import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';

const CreateProduct = () => {
  return (
    <Layout title={'Product-Admin-Dashboard'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProduct;
