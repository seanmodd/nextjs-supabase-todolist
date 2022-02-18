import Footer from './Footer';
import Header from './Header';

export default function ({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
