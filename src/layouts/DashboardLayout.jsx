import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import StudyLogo from "../pages/Shared/StudyLogo/StudyLogo";
import {
  BarChart2,
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
  Menu,
  X,
} from "lucide-react";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log("Current role", role);

  const userMenuItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard/profile", icon: User, label: "My Profile" },
    { path: "/dashboard/my-applications", icon: FileText, label: "My Applications" },
    { path: "/dashboard/reviews", icon: MessageSquare, label: "My Reviews" },
  ];

  const moderatorMenuItems = [
    { path: "/dashboard/add-scholarship", icon: PlusCircle, label: "Add Scholarship" },
    { path: "/dashboard/manage-scholarships", icon: School, label: "Manage Scholarships" },
    { path: "/dashboard/all-reviews", icon: MessageSquare, label: "All Reviews" },
    { path: "/dashboard/all-applications", icon: Files, label: "All Applications" },
  ];

  const adminMenuItems = [
        { path: "/dashboard/add-scholarship-admin", icon: PlusCircle, label: "Add Scholarship" },
    { path: "/dashboard/manage-scholarships-admin", icon: School, label: "Manage Scholarships" },

    { path: "/dashboard/manage-applied-applications", icon: ClipboardList, label: "Manage Applied" },
    { path: "/dashboard/manage-reviews", icon: MessageSquare, label: "Manage Reviews" },
    { path: "/dashboard/manage-users", icon: Users, label: "Manage Users" },
    { path: "/dashboard/analytics", icon: BarChart2, label: "Analytics Chart" },
  ];

  const renderMenuItem = (item, index) => (
    <li key={index} className="group">
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group-hover:transform group-hover:scale-105 ${
            isActive
              ? "bg-gradient-to-r from-[#f4a261] to-[#f4a261]/80 text-white shadow-lg shadow-[#f4a261]/25 font-semibold"
              : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#640d14] hover:to-[#640d14]/80"
          }`
        }
      >
        <item.icon size={20} className="transition-transform group-hover:scale-110" />
        <span className="font-medium">{item.label}</span>
      </NavLink>
    </li>
  );

  return (
    <div className="drawer lg:drawer-open bg-gradient-to-br from-[#fdfafa] to-[#f9f3f4] dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for Mobile */}
        <div className="navbar bg-gradient-to-r from-[#640d14] to-[#38040e] dark:from-[#264653] dark:to-[#1a332e] text-white shadow-xl lg:hidden px-6">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="ml-4 text-xl font-bold bg-gradient-to-r from-[#f4a261] to-white bg-clip-text text-transparent">
            StudyGrantly
          </div>
        </div>

        {/* Outlet Content */}
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="w-80 min-h-full bg-gradient-to-b from-[#38040e] via-[#2d0309] to-[#38040e] dark:from-[#264653] dark:via-[#1e3a42] dark:to-[#264653] text-white flex flex-col py-8 px-6 shadow-2xl border-r-4 border-[#f4a261] relative">
          
          {/* Close Button for Mobile */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 text-white hover:bg-white/10 hover:text-[#f4a261] transition-all duration-300 lg:hidden"
          >
            <X className="w-5 h-5" />
          </label>

          {/* Branding Section */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <StudyLogo />
            <div className="mt-4 text-center">
              <p className="text-[#f4a261] font-semibold text-sm uppercase tracking-wider">
                {roleLoading ? "Loading..." : role || "User"} Dashboard
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-6">
            {/* User Section */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-[#f4a261] uppercase tracking-wider mb-3 px-2">
                General
              </h3>
              <ul className="space-y-1">
                {userMenuItems.map((item, index) => renderMenuItem(item, index))}
              </ul>
            </div>

            {/* Moderator Section */}
            {!roleLoading && role === "moderator" && (
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-[#f4a261] uppercase tracking-wider mb-3 px-2">
                  Moderator
                </h3>
                <ul className="space-y-1">
                  {moderatorMenuItems.map((item, index) => renderMenuItem(item, `mod-${index}`))}
                </ul>
              </div>
            )}

            {/* Admin Section */}
            {!roleLoading && role === "admin" && (
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-[#f4a261] uppercase tracking-wider mb-3 px-2">
                  Administration
                </h3>
                <ul className="space-y-1">
                  {adminMenuItems.map((item, index) => renderMenuItem(item, `admin-${index}`))}
                </ul>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#f4a261] to-[#640d14] rounded-full mx-auto mb-3 flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-300 mb-1">Welcome back!</p>
              <p className="text-xs text-[#f4a261] font-semibold uppercase tracking-wider">
                {role || "User"}
              </p>
            </div>
            <div className="text-center text-xs text-gray-400 mt-6">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-1 h-1 bg-[#f4a261] rounded-full"></div>
                <div className="w-1 h-1 bg-[#f4a261] rounded-full"></div>
                <div className="w-1 h-1 bg-[#f4a261] rounded-full"></div>
              </div>
              © 2025 StudyGrantly
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;









// import React from "react";
// import { Link, NavLink, Outlet } from "react-router";
// import StudyLogo from "../pages/Shared/StudyLogo/StudyLogo";
// import {
//   BarChart2,
//   BookOpen,
//   ClipboardList,
//   Files,
//   FileText,
//   Home,
//   MessageSquare,
//   PlusCircle,
//   School,
//   User,
//   UserCircle,
//   Users,
// } from "lucide-react";
// import useUserRole from "../hooks/useUserRole";

// const DashboardLayout = () => {
//   const { role, roleLoading } = useUserRole();
//   console.log("Current role", role);
//   return (
//     <div className="drawer lg:drawer-open bg-[#fdfafa] min-h-screen">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

//       {/* Page Content */}
//       <div className="drawer-content flex flex-col">
//         {/* Top Navbar for Mobile */}
//         <div className="navbar bg-[#640d14] text-white shadow-md lg:hidden px-4">
//           <div className="flex-none">
//             <label
//               htmlFor="my-drawer-2"
//               aria-label="open sidebar"
//               className="btn btn-ghost btn-square text-white"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block w-6 h-6 stroke-current"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </label>
//           </div>
//           <div className="ml-4 text-xl font-semibold">StudyGrantly</div>
//         </div>

//         {/* Outlet Content */}
//         <div className="p-6">
//           <Outlet />
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="drawer-side">
//         <label
//           htmlFor="my-drawer-2"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <aside className="w-80 min-h-full bg-[#38040e] text-white flex flex-col py-6 px-4 shadow-2xl">
//           {/* Branding */}
//           <StudyLogo />

//           {/* Navigation Links */}
//           <ul className="menu space-y-2 text-base">
//             {/* user 3 section */}
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-lg transition duration-200 ${
//                     isActive
//                       ? "bg-white text-[#38040e] font-bold shadow"
//                       : "hover:bg-[#640d14] hover:text-white"
//                   }`
//                 }
//               >
//                 <Home size={18} /> Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard/profile"
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-lg transition duration-200 ${
//                     isActive
//                       ? "bg-white text-[#38040e] font-bold shadow"
//                       : "hover:bg-[#640d14] hover:text-white"
//                   }`
//                 }
//               >
//                 <User size={18} /> My Profile
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/dashboard/my-applications"
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-lg transition duration-200 ${
//                     isActive
//                       ? "bg-white text-[#38040e] font-bold shadow"
//                       : "hover:bg-[#640d14] hover:text-white"
//                   }`
//                 }
//               >
//                 <FileText size={18} /> My Applications
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/dashboard/reviews"
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-lg transition duration-200 ${
//                     isActive
//                       ? "bg-white text-[#38040e] font-bold shadow"
//                       : "hover:bg-[#640d14] hover:text-white"
//                   }`
//                 }
//               >
//                 <MessageSquare size={18} /> My Reviews
//               </NavLink>
//             </li>

//             {/* moderator */}
//             {!roleLoading && role === "moderator" && (
//               <>
               
//                      <li>
//                   <NavLink
//                     to="/dashboard/add-scholarship"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <PlusCircle size={18} /> Add Scholarship
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/dashboard/manage-scholarships"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <School size={18} /> Manage Scholarships
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/dashboard/all-reviews"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <MessageSquare size={18} /> All Reviews
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/dashboard/all-applications"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <Files size={18} /> All Applications
//                   </NavLink>
//                 </li>

//               </>
//             )}


//             {/* admin */}
//             {!roleLoading && role === "admin" && (
//               <>
//                 {/* <li>
//                   <NavLink
//                     to="/dashboard/admin-profile"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <User size={18} /> Admin Profile
//                   </NavLink>
//                 </li> */}
//                 {/* <li>
//                   <NavLink
//                     to="/dashboard/add-scholarship"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <PlusCircle size={18} /> Add Scholarship
//                   </NavLink>
//                 </li> */}
//                 {/* <li>
//                   <NavLink
//                     to="/dashboard/manage-scholarships"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <BookOpen size={18} /> Manage Scholarships
//                   </NavLink>
//                 </li> */}
//                 {/* <li>
//                   <NavLink
//                     to="/dashboard/manage-applications"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <ClipboardList size={18} /> Manage Applications
//                   </NavLink>
//                 </li> */}
//                 <li>
//   <NavLink
//     to="/dashboard/manage-applied-applications"
//     className={({ isActive }) =>
//       `px-4 py-2 rounded-lg transition duration-200 ${
//         isActive
//           ? "bg-white text-[#38040e] font-bold shadow"
//           : "hover:bg-[#640d14] hover:text-white"
//       }`
//     }
//   >
//     <ClipboardList size={18} /> Manage Applied Applications
//   </NavLink>
// </li>
//                 <li>
//                   <NavLink
//                     to="/dashboard/manage-reviews"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <MessageSquare size={18} /> Manage Reviews
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/dashboard/manage-users"
//                     className={({ isActive }) =>
//                       `px-4 py-2 rounded-lg transition duration-200 ${
//                         isActive
//                           ? "bg-white text-[#38040e] font-bold shadow"
//                           : "hover:bg-[#640d14] hover:text-white"
//                       }`
//                     }
//                   >
//                     <Users size={18} /> Manage Users
//                   </NavLink>
//                 </li>
//                 <li>
//   <NavLink
//     to="/dashboard/analytics"
//     className={({ isActive }) =>
//       `px-4 py-2 rounded-lg transition duration-200 ${
//         isActive
//           ? "bg-white text-[#38040e] font-bold shadow"
//           : "hover:bg-[#640d14] hover:text-white"
//       }`
//     }
//   >
//     <BarChart2 size={18} /> Analytics Chart
//   </NavLink>
// </li>
//               </>
//             )}

//             {/* Add more links here */}
//           </ul>

//           {/* Footer */}
//           <div className="mt-auto text-center text-sm opacity-60 pt-6">
//             © 2025 StudyGrantly
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;










