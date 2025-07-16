import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import StudyLogo from "../pages/Shared/StudyLogo/StudyLogo";
import {
  BookOpen,
  ClipboardList,
  Files,
  FileText,
  Home,
  MessageSquare,
  PlusCircle,
  School,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log("Current role", role);
  return (
    <div className="drawer lg:drawer-open bg-[#fdfafa] min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for Mobile */}
        <div className="navbar bg-[#640d14] text-white shadow-md lg:hidden px-4">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="ml-4 text-xl font-semibold">StudyGrantly</div>
        </div>

        {/* Outlet Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="w-80 min-h-full bg-[#38040e] text-white flex flex-col py-6 px-4 shadow-2xl">
          {/* Branding */}
          <StudyLogo />

          {/* Navigation Links */}
          <ul className="menu space-y-2 text-base">
            {/* user 3 section */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-white text-[#38040e] font-bold shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }
              >
                <Home size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-white text-[#38040e] font-bold shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }
              >
                <User size={18} /> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-applications"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-white text-[#38040e] font-bold shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }
              >
                <FileText size={18} /> My Applications
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/reviews"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-white text-[#38040e] font-bold shadow"
                      : "hover:bg-[#640d14] hover:text-white"
                  }`
                }
              >
                <MessageSquare size={18} /> My Reviews
              </NavLink>
            </li>

            {/* moderator */}
            {!roleLoading && role === "moderator" && (
              <>
               
                     <li>
                  <NavLink
                    to="/dashboard/add-scholarship"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <PlusCircle size={18} /> Add Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-scholarships"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <School size={18} /> Manage Scholarships
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-reviews"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <MessageSquare size={18} /> All Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-applications"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <Files size={18} /> All Applications
                  </NavLink>
                </li>

              </>
            )}


            {/* admin */}
            {!roleLoading && role === "admin" && (
              <>
                {/* <li>
                  <NavLink
                    to="/dashboard/admin-profile"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <User size={18} /> Admin Profile
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/dashboard/add-scholarship"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <PlusCircle size={18} /> Add Scholarship
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/dashboard/manage-scholarships"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <BookOpen size={18} /> Manage Scholarships
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/dashboard/manage-applications"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <ClipboardList size={18} /> Manage Applications
                  </NavLink>
                </li> */}
                <li>
  <NavLink
    to="/dashboard/manage-applied-applications"
    className={({ isActive }) =>
      `px-4 py-2 rounded-lg transition duration-200 ${
        isActive
          ? "bg-white text-[#38040e] font-bold shadow"
          : "hover:bg-[#640d14] hover:text-white"
      }`
    }
  >
    <ClipboardList size={18} /> Manage Applied Applications
  </NavLink>
</li>
                <li>
                  <NavLink
                    to="/dashboard/manage-reviews"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <MessageSquare size={18} /> Manage Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg transition duration-200 ${
                        isActive
                          ? "bg-white text-[#38040e] font-bold shadow"
                          : "hover:bg-[#640d14] hover:text-white"
                      }`
                    }
                  >
                    <Users size={18} /> Manage Users
                  </NavLink>
                </li>
              </>
            )}

            {/* Add more links here */}
          </ul>

          {/* Footer */}
          <div className="mt-auto text-center text-sm opacity-60 pt-6">
            © 2025 StudyGrantly
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
