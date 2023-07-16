import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet';
import { Toaster, ToastBar, toast } from 'react-hot-toast';

const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Toaster>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? 'custom-enter 0.5s ease'
                  : 'custom-exit 0.5s ease',
              }}
            />
          )}
        </Toaster>
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: 'ECommerce App - shop now',
  description: 'MERN stack',
  keywords: 'mern, react, node, mongodb, express',
  author: 'Julian Huang',
};
export default Layout;
