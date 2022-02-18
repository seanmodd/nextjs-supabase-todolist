import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
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
import VehicleFilter from './VehicleFilter';
import VehicleSort from './VehicleSort';
import VehicleGrid from './VehicleGrid';

function Sort() {
  return (
    <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Vehicles
        </h1>

        <div className="flex items-center">
          <VehicleSort />

          <VehicleFilter />
        </div>
      </div>
      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>
        <VehicleGrid />
      </section>
    </main>
  );
}

export default Sort;
