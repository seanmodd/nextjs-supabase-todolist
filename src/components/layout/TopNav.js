import { SearchIcon, HeartIcon } from '@heroicons/react/outline';
import SlideOutMenu from './SlideOutMenu';

function Header() {
  return (
    <div>
      <header className="relative bg-white">
        <p className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-indigo-600 sm:px-6 lg:px-8">
          Join our Beta launch now!
        </p>

        <nav
          aria-label="Top"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16">
              {/* Menus */}
              <SlideOutMenu />
              {/* Logo */}
              <Logo />
              {/* Search */}
              <Search />
              {/* Heart Icon for Favoriting Vehicles */}
              <Favorites />
              {/* Sign in and Create Account */}
              <div className="flex items-center ml-auto">
                <div className="flex items-center justify-end flex-1 space-x-6">
                  <SignIn />
                  <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                  <Register />
                </div>
              </div>
              {/* Currency */}
              <Currency />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;

function SignIn() {
  return (
    <a
      href="#"
      className="text-sm font-medium text-gray-700 hover:text-gray-800"
    >
      Sign in
    </a>
  );
}
function Register() {
  return (
    <a
      href="#"
      className="text-sm font-medium text-gray-700 hover:text-gray-800"
    >
      Create account
    </a>
  );
}
function Currency() {
  return (
    <div className="hidden ml-8 lg:flex">
      <a
        href="#"
        className="flex items-center text-gray-700 hover:text-gray-800"
      >
        <img
          src="https://tailwindui.com/img/flags/flag-united-states.svg"
          alt=""
          className="flex-shrink-0 block w-5 h-auto"
        />
        <span className="block ml-3 text-sm font-medium">USD</span>
        <span className="sr-only">, change currency</span>
      </a>
    </div>
  );
}
function Favorites() {
  return (
    <div className="flow-root ml-4 lg:ml-6">
      <a href="#" className="flex items-center p-2 -m-2 group">
        <HeartIcon
          className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
        <span className="sr-only">items favorited, view all</span>
      </a>
    </div>
  );
}
function Search() {
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
function Logo() {
  return (
    <div className="flex ml-4 mr-4 ">
      <a href="#">
        <span className="sr-only">Workflow</span>
        <img
          className="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
          alt=""
        />
      </a>
    </div>
  );
}
