import Layout from '../components/layout/Layout';

const PolicyPage = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contact.jpeg"
            alt="contact us"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-4">
          <p>Policy 1</p>
          <p>Policy 1</p>
          <p>Policy 1</p>
          <p>Policy 1</p>
          <p>Policy 1</p>
          <p>Policy 1</p>
        </div>
      </div>
    </Layout>
  );
};
export default PolicyPage;
