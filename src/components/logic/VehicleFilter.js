import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  AdjustmentsIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/react/solid';

function VehicleFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <>
      <SlideRight
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      <button
        type="button"
        className="p-2 ml-4 -m-2 text-gray-400 sm:ml-6 hover:text-gray-500"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        {/* <FilterIcon className="w-5 h-5" aria-hidden="true" /> */}
        <AdjustmentsIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </>
  );
}

export default VehicleFilter;

const subCategories = [
  { name: 'New', href: '#' },
  { name: 'Pre-Owned', href: '#' },
];
const filters = [
  {
    id: 'color',
    name: 'Filter Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Filter Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Filter Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
];
function SlideRight({ mobileFiltersOpen, setMobileFiltersOpen }) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex "
        onClose={setMobileFiltersOpen}
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

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <FilterForm />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
function FilterForm() {
  return (
    <form className="mt-4 border-t border-gray-200">
      <h3 className="sr-only">Categories</h3>
      <ul role="list" className="px-2 py-3 font-medium text-gray-900">
        {subCategories.map((category) => (
          <li key={category.name}>
            <a href={category.href} className="block px-2 py-3">
              {category.name}
            </a>
          </li>
        ))}
      </ul>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="px-4 py-6 border-t border-gray-200"
        >
          {({ open }) => (
            <>
              <h3 className="flow-root -mx-2 -my-3">
                <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="flex items-center ml-6">
                    {open ? (
                      <MinusSmIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="w-5 h-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-6">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="flex-1 min-w-0 ml-3 text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}
