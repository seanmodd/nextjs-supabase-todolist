/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Tab,
  Transition,
} from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import ShopLayout from 'src/components/layout/AppLayout';

export default function ShopComponent() {
  return (
    <div className="bg-white">
      <div>
        <ShopLayout>
          <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            Landing
          </main>
        </ShopLayout>
      </div>
    </div>
  );
}
