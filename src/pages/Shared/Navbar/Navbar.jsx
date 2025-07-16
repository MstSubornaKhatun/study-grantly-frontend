import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import {
  LayoutDashboard,
  BookOpen,
  Home,
  LogOut,
} from "lucide-react";
import StudyLogo from "../StudyLogo/StudyLogo";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-white shadow-lg font-semibold bg-[#500b10]"
        : "text-white hover:font-semibold"
    }`;

  return (
    <nav className="navbar bg-[#640d14] shadow-sm rounded">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center w-full">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Dropdown */}
          <div className="lg:hidden dropdown dropdown-bottom">
            <label
              tabIndex={0}
              className="btn btn-ghost text-white lg:hidden p-0 m-0"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          <ul
  tabIndex={0}
  className="dropdown-content menu p-2 mt-3 shadow bg-[#640d14] text-white rounded-box w-56 space-y-1"
>
  <li>
    <NavLink to="/" className={linkStyle}>
      <Home size={18} />
      Home
    </NavLink>
  </li>
  <li>
    <NavLink to="/all-scholarships" className={linkStyle}>
      <BookOpen size={18} />
      All Scholarships
    </NavLink>
  </li>
  <li>
    <NavLink to="/my-applications" className={linkStyle}>
      <BookOpen size={18} />
      My Applications
    </NavLink>
  </li>
  {user && (
    <li>
      <NavLink to="/dashboard" className={linkStyle}>
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>
    </li>
  )}
</ul>
          </div>

          {/* Logo */}
          <StudyLogo />
        </div>

        {/* Center: Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-4">
          <li>
            <NavLink to="/" className={linkStyle}>
              <Home size={18} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-scholarships" className={linkStyle}>
              <BookOpen size={18} />
              All Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-applications" className={linkStyle}>
              <BookOpen size={18} />
              My Applications
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/dashboard" className={linkStyle}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center cursor-pointer"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/0XtzpHt/avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] mt-3 p-3 bg-white text-[#640d14] shadow rounded-box w-60 space-y-2"
              >
                <li className="font-semibold text-center">
                  {user.displayName}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm w-full bg-[#640d14] text-white hover:bg-[#500b10]"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                     className="btn btn-sm bg-[#640d14] text-white border-none hover:bg-[#500b10]"
    >

                Login
              </Link>
              <Link
                to="/register"
                          className="btn btn-sm bg-white text-[#640d14] border border-[#640d14] hover:bg-[#f3f3f3]"
    >

                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;