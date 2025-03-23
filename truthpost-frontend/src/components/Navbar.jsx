import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.setItem("isLogin", "false"); // Store as string "false"
    navigate('/');
  };

  const isLoggedIn = localStorage.getItem("isLogin") === "true"; // Check login status

  return (
    <>
      {isLoggedIn && ( 
        <nav className="bg-gray-900 py-4 border-b border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="flex justify-between items-center h-12">
              {/* Logo/Brand */}
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-400 via-gray-200 to-gray-100 bg-clip-text text-transparent hover:from-gray-200 hover:via-gray-400 hover:to-gray-600 transition-all duration-500">
                  BlackNWhite
                </h1>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex space-x-8">
                  <Link 
                    to="/" 
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-800 font-medium flex items-center"
                  >
                    <span className="mr-2">🏠</span> Home
                  </Link>
                  <Link 
                    to="/news" 
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-800 font-medium flex items-center"
                  >
                    <span className="mr-2">📰</span> News
                  </Link>
                  <Link 
                    to="/admin" 
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-800 font-medium flex items-center"
                  >
                    <span className="mr-2">🔒</span> Admin
                  </Link>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-800 font-medium flex items-center border border-red-600 hover:border-red-400"
                >
                  <span className="mr-2">🚪</span> Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;