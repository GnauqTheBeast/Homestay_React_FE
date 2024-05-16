import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useState } from "react";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, userId, logout, userRole } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">Gnauq Homestay</Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn() ? (
            <>
              <Link className="hover:text-darkBlue px-4 py-2" to="/users/profile">
                Welcome, {userId}
              </Link>
              <a
                onClick={logout}
                className="px-4 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70 cursor-pointer"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-darkBlue px-4 py-2">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              >
                Signup
              </Link>
            </>
          )}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 font-bold rounded text-white bg-blue-500 hover:bg-blue-700"
            >
              Menu
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                <div className="flex flex-col p-2">
                  {userRole === 'host' && (
                    <button onClick={() => navigate("homestay/create") } className="px-4 py-2 font-bold rounded text-white bg-blue-500 hover:bg-blue-700">
                      Create Homestay
                    </button>
                  )}
                  {userRole === 'admin' && (
                    <button className="px-4 py-2 font-bold rounded text-white bg-red-500 hover:bg-red-700">
                      Admin Dashboard
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
