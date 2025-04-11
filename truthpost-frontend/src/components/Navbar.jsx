import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
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

const NavItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition duration-300 font-medium"
  >
    <span className="mr-2">{icon}</span> {label}
  </Link>
);

export default Navbar;
