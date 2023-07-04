import Layout from '../components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout title={'About Us- ECommerce'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="contact us"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            I have mastered several programming languages such as JavaScript,
            HTML, CSS, C#, as well as their frameworks like Node.js and React. I
            am also proficient in UI design and user interaction experience. I
            am a self-driven individual who can solve problems independently and
            collaborate effectively in a team. Furthermore, I understand the
            importance of communication in teamwork, as effective communication
            can greatly enhance team productivity.
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default AboutPage;
