function Footer() {
  const footerNavigation = {
    account: [
      { name: 'Manage Account', href: '#' },
      { name: 'Saved Vehicles', href: '#' },
      { name: 'Logout', href: '#' },
    ],
    service: [
      { name: 'Shipping & Returns', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Get in touch', href: '#' },
    ],
    company: [
      { name: 'About CarX', href: '#' },
      { name: 'Why CarX', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
    ],
    connect: [
      { name: 'Discord', href: '#' },
      { name: 'Instagram', href: '#' },
      { name: 'Twitter', href: '#' },
    ],
  };
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-20 border-t border-gray-200 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Account</h3>
              <ul role="list" className="mt-6 space-y-6">
                {footerNavigation.account.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Service</h3>
              <ul role="list" className="mt-6 space-y-6">
                {footerNavigation.service.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Company</h3>
              <ul role="list" className="mt-6 space-y-6">
                {footerNavigation.company.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Connect</h3>
              <ul role="list" className="mt-6 space-y-6">
                {footerNavigation.connect.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-10 border-t border-gray-100 sm:flex sm:items-center sm:justify-between">
          <p className="mt-6 text-sm text-center text-gray-500 sm:mt-0">
            &copy; 2022 Senpex, LLC
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
