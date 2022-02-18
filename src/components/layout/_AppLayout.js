import Footer from './Footer';
import TopNav from './TopNav';

export default function ({ children }) {
  return (
    <>
      <TopNav />
      {children}
      <Footer />
    </>
  );
}
