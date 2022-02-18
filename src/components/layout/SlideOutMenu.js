import { Fragment, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline';

function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <LeftSlider
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <button
        type="button"
        className="p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 "
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        {/* <MenuIcon className="w-6 h-6" aria-hidden="true" /> */}
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>
    </>
  );
}

export default MobileHeader;

const navigation = {
  categories: [
    {
      id: 'buy',
      name: 'Buy',
      featured: [
        {
          name: 'New',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Pre-Owned',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'status',
          name: 'Make',
          items: [
            { name: 'Volkswagen', href: '#' },
            { name: 'Mercedes-Benz', href: '#' },
            { name: 'Chrysler', href: '#' },
            { name: 'Jeep', href: '#' },
            { name: 'Dodge', href: '#' },

            { name: 'Browse All', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'sell',
      name: 'Sell',
      featured: [
        {
          name: 'Receive a Quote',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
      ],
      sections: [
        {
          id: 'carfax-sell',
          name: 'Price Estimator',
          items: [
            { name: 'Find Your Cars Price Now', href: '#' },
            { name: 'Browse All Options', href: '#' },
          ],
        },
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function LeftSlider({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex"
        onClose={setMobileMenuOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <SliderData setMobileMenuOpen={setMobileMenuOpen} />
      </Dialog>
    </Transition.Root>
  );
}

function SliderData({ setMobileMenuOpen }) {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
        <div className="flex px-4 pt-5 pb-2">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="px-4 py-6 space-y-6 border-t border-gray-200">
          <div className="flow-root">
            <a href="#" className="block p-2 -m-2 font-medium text-gray-900">
              Sign in
            </a>
          </div>
          <div className="flow-root">
            <a href="#" className="block p-2 -m-2 font-medium text-gray-900">
              Create account
            </a>
          </div>
        </div>
        <div className="px-4 space-y-6 border-t border-gray-200" />
        {/* Links */}
        <TabGroupComponent />

        <div className="px-4 py-6 border-t border-gray-200 lg:hidden">
          <a href="#" className="flex items-center p-2 -m-2">
            <img
              src="https://tailwindui.com/img/flags/flag-united-states.svg"
              alt=""
              className="flex-shrink-0 block w-5 h-auto"
            />
            <span className="block ml-3 text-base font-medium text-gray-900">
              USD
            </span>
            <span className="sr-only">, change currency</span>
          </a>
        </div>
      </div>
    </Transition.Child>
  );
}

function TabGroupComponent() {
  return (
    <Tab.Group as="div" className="mt-2">
      <div className="border-b border-gray-200">
        <Tab.List className="flex px-4 -mb-px space-x-8">
          {navigation.categories.map((category) => (
            <Tab
              key={category.name}
              className={({ selected }) =>
                classNames(
                  selected
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-900 border-transparent',
                  'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                )
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
      </div>
      <Tab.Panels as={Fragment}>
        {navigation.categories.map((category) => (
          <Tab.Panel key={category.name} className="px-4 pt-10 pb-8 space-y-10">
            <div className="grid grid-cols-2 gap-x-4">
              {category.featured.map((item) => (
                <div key={item.name} className="relative text-sm group">
                  <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="object-cover object-center"
                    />
                  </div>
                  <a
                    href={item.href}
                    className="block mt-6 font-medium text-gray-900"
                  >
                    <span
                      className="absolute inset-0 z-10"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                  <p aria-hidden="true" className="mt-1" />
                </div>
              ))}
            </div>
            {category.sections.map((section) => (
              <div key={section.name}>
                <p
                  id={`${category.id}-${section.id}-heading-mobile`}
                  className="font-medium text-gray-900"
                >
                  {section.name}
                </p>
                <ul
                  role="list"
                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                  className="flex flex-col mt-6 space-y-6"
                >
                  {section.items.map((item) => (
                    <li key={item.name} className="flow-root">
                      <a
                        href={item.href}
                        className="block p-2 -m-2 text-gray-500"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
