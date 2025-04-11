<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/outline';
>>>>>>> arsh

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const isLogin = localStorage.getItem('isLogin') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsLoggedIn(!!token && isLogin);
    setUserType(user.role === 'admin' ? 'admin' : 'user');

    // Check for dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [location]); // Add location to dependencies to update on route change

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
<<<<<<< HEAD
    localStorage.removeItem("authToken");
    localStorage.setItem("isLogin", "false");
    navigate("/");
  };

  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  return (
    <>
      {isLoggedIn && (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-60 backdrop-blur-md shadow-xl border-b border-gray-700 fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
  {/* Icon */}
  <div className="bg-white rounded-full p-1 shadow-md">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 5V11C4 16.52 7.82 21.74 12 23C16.18 21.74 20 16.52 20 11V5L12 2Z" fill="#000000"/>
    </svg>
  </div>

  {/* Logo Text */}
  <Link to="/" className="flex-shrink-0">
    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
      Deep<span className="text-purple-400">-</span>Shield
    </h1>
  </Link>
</div>


              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex space-x-6">
                  <NavItem icon="🏠" label="Home" to="/" />
                  <NavItem icon="📰" label="News" to="/news" />
                  <NavItem icon="🔒" label="Admin" to="/admin" />
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:text-white hover:bg-red-500 hover:border-red-400 transition duration-300 font-semibold shadow-sm"
=======
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserType(null);
    setShowLogoutPopup(false);
    navigate('/');
  };

  const userNavLinks = [
    { path: '/home', label: 'Home' },
    { path: '/news', label: 'News' },
  ];

  const adminNavLinks = [
    { path: '/home', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/admin', label: 'Admin' },
  ];

  const navLinks = userType === 'admin' ? adminNavLinks : userNavLinks;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
>>>>>>> arsh
                >
                  DeepShield
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            {isLoggedIn && (
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <UserIcon className="h-6 w-6" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
          {isLoggedIn && navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setShowLogoutPopup(true);
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Logout
            </button>
          )}
        </div>
      </motion.div>

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition duration-300 font-medium"
  >
    <span className="mr-2">{icon}</span> {label}
  </Link>
);

export default Navbar;
