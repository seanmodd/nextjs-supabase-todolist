import Footer from './Footer';
import TopNav from './TopNav';

export default function ({ children }) {
  return (
    <>
      <TopNav />
      <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}
