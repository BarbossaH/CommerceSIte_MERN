import Layout from '../components/layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';
const ContactPage = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contact us"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-warning p-2 text-light text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query and info about me feel free to call anytime I 24*7
            available
          </p>
          <p className="mt-3">
            <span style={{ color: 'green' }}>
              <BiMailSend />
            </span>
            : julianhb515@gmail.com
          </p>
          <p className="mt-3">
            <span style={{ color: 'green' }}>
              <BiPhoneCall />
            </span>
            : 022-177 3909
          </p>
          <p className="mt-3">
            <span style={{ color: 'green' }}>
              <BiSupport />
            </span>
            : https://github.com/BarbossaH/
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default ContactPage;
