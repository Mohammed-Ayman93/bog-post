import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../App";

export default function Navbar() {
  // ------------------ States ----------------------- //

  const { currentUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ------------------ UI ----------------------- //

  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Blogify
        </Link>
        <div className="flex items-center gap-4">
          {currentUser.name ? (
            <div className="dropdown dropdown-center">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <img
                  src={currentUser.profilePic}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border hover:ring-2 hover:ring-blue-500 transition"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content text-center mt-3 w-52 bg-white rounded-xl shadow-lg border p-2 space-y-1"
              >
                <li className="px-3 py-2 text-sm text-gray-500">
                  Signed in as
                  <p className="font-semibold text-gray-800 truncate">
                    {currentUser.name}
                  </p>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <Link
                    href="/profile"
                    className="rounded-lg hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-posts"
                    className="rounded-lg hover:bg-gray-100"
                  >
                    My Posts
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn border-black px-3 text-red-500 hover:bg-red-600 hover:text-white rounded-lg"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary text-white">
              Login / Regiser
            </Link>
          )}{" "}
        </div>
      </div>
    </header>
  );
}
