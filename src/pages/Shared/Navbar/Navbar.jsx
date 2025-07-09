import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  LayoutDashboard,
  UserRoundSearch,
  BrainCog,
  FolderKanban,
  MessageSquareText,
  Settings,
  ShieldCheck,
  UserPlus,
  BookOpen,
  Home,
  FilePlus2,
} from "lucide-react";
import StudyLogo from "../StudyLogo/StudyLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
        
  const { user, logOut} = useAuth();
  const [theme, setTheme] = useState("light");


      const handleSignOut = () =>{
        logOut()
        .then(() =>{
            console.log('signed out user')
        })
        .catch(error =>{
            console.log(error)
        })
    }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const navItems = (
    <>
      {/* Public Routes */}
      <li>
        <NavLink to="/" className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "text-[#38040e] underline shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }>
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships"  className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "bg-white text-[#38040e] shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }>
          <BookOpen size={18} /> All Scholarship
        </NavLink>
      </li>

      {/* User Dashboard - role === 'user' */}
      {user && (
        <>
          <li>
            <NavLink to="/dashboard"  className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "bg-white text-[#38040e] shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>
        </>
      )}

      {/* Moderator Dashboard - role === 'moderator' */}
      {/* <li>
    <NavLink to="/dashboard/moderator"  className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "bg-white text-[#38040e] shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }>
      <ShieldCheck size={18} /> Moderator Dashboard
    </NavLink>
  </li> */}

      {/* Admin Dashboard - role === 'admin' */}
      {/* <li>
    <NavLink to="/dashboard/admin"  className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "bg-white text-[#38040e] shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }>
      <Settings size={18} /> Admin Dashboard
    </NavLink>
  </li> */}

      {/* Logout Button - Show only if logged in */}
      {/* <li>
    <button onClick={handleLogout}  className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "bg-white text-[#38040e] shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }>
      <LogOut size={18} /> Logout
    </button>
  </li> */}

      <li>
        <NavLink
          to="/add-scholarship"
      className={({ isActive }) =>
                  `text-white bg-[#640d14] hover:font-extralight ${
                    isActive
                      ? "bg-white text-[#38040e] shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }
        >
          <FilePlus2 size={18} /> Add Scholarship
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#640d14] shadow-sm border-none rounded">
      {/* Left: Dropdown + Logo */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        {/* Logo */}
        <StudyLogo />
      </div>

      {/* Center: Main Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{navItems}</ul>
      </div>

      {/* Right: Login/Register/Profile */}
      <div className="navbar-end">
             {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-700 cursor-pointer"
                src={user.photoURL || ""}
                alt="User"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-60 p-4 shadow"
            >
              <div className="text-center">
                <h5 className="font-bold">{user.displayName}</h5>
                <button
                  onClick={handleSignOut}
                  className="btn bg-blue-600 text-white hover:bg-blue-700 mt-2 w-full"
                >
                  Logout
                </button>
              </div>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white mr-3"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}

      </div>

      {/* dark mode btn */}
      <div className="ml-3">
        <button
          onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? (
            <span>
              {" "}
              {/* sun icon */}
              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </span>
          ) : (
            <span>
              {" "}
              {/* moon icon */}
              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
