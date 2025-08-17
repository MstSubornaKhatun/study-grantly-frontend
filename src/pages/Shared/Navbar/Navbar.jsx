// import React from "react";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import {
//   LayoutDashboard,
//   BookOpen,
//   Home,
//   LogOut,
// } from "lucide-react";
// import StudyLogo from "../StudyLogo/StudyLogo";

// const Navbar = () => {
//   const { user, logOut } = useAuth();

//   const handleLogout = () => {
//     logOut()
//       .then(() => console.log("Logged out"))
//       .catch((err) => console.error(err));
//   };

//   const linkStyle = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
//       isActive
//         ? "text-white shadow-lg font-semibold bg-[#500b10]"
//         : "text-white hover:font-semibold"
//     }`;

//   return (
//     <nav className="navbar bg-[#640d14] shadow-sm rounded">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center w-full">
//         {/* Left: Logo & Mobile Menu */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Dropdown */}
//           <div className="lg:hidden dropdown dropdown-bottom">
//             <label
//               tabIndex={0}
//               className="btn btn-ghost text-white lg:hidden p-0 m-0"
//             >
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
//                 <path
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </label>
//           <ul
//   tabIndex={0}
//   className="dropdown-content menu p-2 mt-3 shadow bg-[#640d14] text-white rounded-box w-56 space-y-1"
// >
  // <li>
  //   <NavLink to="/" className={linkStyle}>
  //     <Home size={18} />
  //     Home
  //   </NavLink>
  // </li>
  // <li>
  //   <NavLink to="/all-scholarships" className={linkStyle}>
  //     <BookOpen size={18} />
  //     All Scholarships
  //   </NavLink>
  // </li>
  // <li>
  //   <NavLink to="/my-applications" className={linkStyle}>
  //     <BookOpen size={18} />
  //     My Applications
  //   </NavLink>
  // </li>
  // {user && (
  //   <li>
  //     <NavLink to="/dashboard" className={linkStyle}>
  //       <LayoutDashboard size={18} />
  //       Dashboard
  //     </NavLink>
  //   </li>
//   )}
// </ul>
//           </div>

//           {/* Logo */}
//           <StudyLogo />
//         </div>

//         {/* Center: Desktop Menu */}
//         <ul className="hidden lg:flex items-center gap-4">
//           <li>
//             <NavLink to="/" className={linkStyle}>
//               <Home size={18} />
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/all-scholarships" className={linkStyle}>
//               <BookOpen size={18} />
//               All Scholarships
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/my-applications" className={linkStyle}>
//               <BookOpen size={18} />
//               My Applications
//             </NavLink>
//           </li>
//           {user && (
//             <li>
//               <NavLink to="/dashboard" className={linkStyle}>
//                 <LayoutDashboard size={18} />
//                 Dashboard
//               </NavLink>
//             </li>
//           )}
//         </ul>

//         {/* Right: Auth Buttons */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="flex items-center cursor-pointer"
//               >
//                 <img
//                   src={user.photoURL || "https://i.ibb.co/0XtzpHt/avatar.png"}
//                   alt="profile"
//                   className="w-10 h-10 rounded-full border-2 border-white"
//                 />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] mt-3 p-3 bg-white text-[#640d14] shadow rounded-box w-60 space-y-2"
//               >
//                 <li className="font-semibold text-center">
//                   {user.displayName}
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="btn btn-sm w-full bg-[#640d14] text-white hover:bg-[#500b10]"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                      className="btn btn-sm bg-white text-[#640d14] border border-[#640d14] hover:bg-[#f3f3f3]"
//     >

//                 Login
//               </Link>
     
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; 
import useAuth from "../../../hooks/useAuth";
import {
  LayoutDashboard,
  BookOpen,
  Home,
  LogOut,
  UserPlus,
  LogIn,
} from "lucide-react";
import StudyLogo from "../StudyLogo/StudyLogo";

const Navbar = () => {
  const { user, logOut } = useAuth(); // logOut নাম ঠিক করা
  const [theme, setTheme] = useState("light");

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-white shadow-md font-semibold bg-[#500b10] border border-[#f4a261]"
        : "text-white hover:font-semibold hover:bg-[#7a1b22] hover:text-[#f4a261]"
    }`;

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

  // Logged out users - exactly 3 routes (except login/logout/register routes)
  const loggedOutRoutes = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/all-scholarships", icon: BookOpen, label: "All Scholarships" },
    { path: "/my-applications", icon: BookOpen, label: "My Applications" }
  ];

  // Logged in users - exactly 5 routes 
  const loggedInRoutes = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/all-scholarships", icon: BookOpen, label: "All Scholarships" },
    { path: "/my-applications", icon: BookOpen, label: "My Applications" },
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }
  ];

  const currentRoutes = user ? loggedInRoutes : loggedOutRoutes;

  return (
    <nav className="bg-gradient-to-r from-[#640d14] to-[#4a0a10] sticky top-0 z-50 shadow-lg w-full dark:from-gray-900 dark:to-gray-800 text-white dark:text-gray-300">
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center w-full">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Dropdown */}
            <div className="lg:hidden dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost text-white p-0 m-0 hover:text-[#f4a261]"
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
                className="dropdown-content menu mt-3 p-2 shadow bg-[#640d14] text-white rounded-box w-56 space-y-1 border border-[#f4a261]"
              >
                {currentRoutes.map((route) => {
                  const IconComponent = route.icon;
                  return (
                    <li key={route.path}>
                      <NavLink to={route.path} className={linkStyle}>
                        <IconComponent size={18} />
                        {route.label}
                      </NavLink>
                    </li>
                  );
                })}

                {!user && (
                  <>
                    <li className="border-t border-[#f4a261] pt-2 mt-2">
                      <NavLink to="/login" className={linkStyle}>
                        <LogIn size={18} />
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" className={linkStyle}>
                        <UserPlus size={18} />
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Logo */}
            <StudyLogo />
          </div>

          {/* Center: Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-8">
              {currentRoutes.map((route) => {
                const IconComponent = route.icon;
                return (
                  <li key={route.path}>
                    <NavLink 
                      to={route.path} 
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 text-base font-medium ${
                          isActive
                            ? "text-[#f4a261] font-semibold"
                            : "text-white hover:text-[#f4a261]"
                        }`
                      }
                    >
                      <IconComponent size={18} />
                      {route.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Auth/Profile + Theme Toggle */}
          <div className="flex items-center gap-3">
            {!user && (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2 bg-gradient-to-r from-[#f4a261] to-[#e09449] text-[#640d14] font-semibold rounded-full hover:from-[#e09449] hover:to-[#cc7a2e] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-[#f4a261] to-[#e09449] text-[#640d14] font-semibold rounded-full hover:from-[#e09449] hover:to-[#cc7a2e] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/0XtzpHt/avatar.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-[#f4a261] object-cover shadow-md"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 p-4 bg-white dark:bg-gray-800 text-[#640d14] dark:text-[#f4a261] shadow-xl rounded-lg w-60 space-y-3 border border-gray-200 dark:border-gray-600"
                >
                  <li className="font-semibold text-center border-b border-gray-200 dark:border-gray-600 pb-2">
                    {user.displayName || "User"}
                  </li>
                  <li className="text-sm text-[#264653] dark:text-gray-400 text-center pb-2">
                    {user.email}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-[#640d14] to-[#4a0a10] dark:from-[#f4a261] dark:to-[#e09449] text-white dark:text-[#640d14] font-medium rounded-full hover:from-[#4a0a10] hover:to-[#640d14] dark:hover:from-[#e09449] dark:hover:to-[#cc7a2e] transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}

            {/* Theme Toggle */}
            <div>
              <button
                onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="p-2 rounded-full bg-[#264653] text-[#f4a261] hover:bg-[#f4a261] hover:text-[#264653] transition-all duration-300 shadow-md"
              >
                {theme === "dark" ? (
                  <span>
                    {/* sun icon */}
                    <svg
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                  </span>
                ) : (
                  <span>
                    {/* moon icon */}
                    <svg
                      className="h-5 w-5 fill-current"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;