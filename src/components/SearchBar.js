import { SearchIcon, HeartIcon } from '@heroicons/react/outline';

export default function Search() {
  return (
    <div className="flex mr-4 lg:ml-6">
      <a
        href="#"
        className="p-2 px-4 text-gray-400 lg:px-6 hover:text-gray-500"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-6 h-6" aria-hidden="true" />
      </a>
    </div>
  );
}
