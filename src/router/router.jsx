import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
// import AddScholarship from "../pages/AddScholarship/AddScholarship";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MyApplication from "../pages/Dashboard/User/MyApplication";
import MyReviews from "../pages/Dashboard/MyReviews";
// import ModeratorRoute from "../routes/ModeratorRoute";
import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import ManageScholarships from "../pages/Dashboard/Moderator/ManageScholarships";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import AllAppliedScholarships from "../pages/Dashboard/Moderator/AllAppliedScholarships";
import AddScholarship from "../pages/Dashboard/Moderator/AddScholarship";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications";
// import AllScholarship from "../pages/TopScholarship/AllScholarship";
// import ScholarshipDetails from "../pages/TopScholarship/ScholarshipDetails";
// import ApplyScholarship from "../pages/TopScholarship/ApplyScholarship";
// import Payment from "../Payment/Payment";
import AllScholarship from "../components/TopScholarship/AllScholarship";
import ScholarshipDetails from "../components/TopScholarship/ScholarshipDetails";
import ApplyScholarship from "../components/TopScholarship/ApplyScholarship";
import Payment from "../components/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {},
      {
        path: "/all-scholarships",
        element: <AllScholarship />,
      },

      {
        path: "/scholarship/:id",
        element: <ScholarshipDetails />,
      },
      {
        path: "/apply-scholarship/:id",
        element: <ApplyScholarship />,
      },
      // {
      //  path:"/payment/:id", element:<PrivateRoute><Payment /></PrivateRoute>
      // }
      // {
      //   path: 'add-scholarship',
      //   Component: AddScholarship
      // }
      // {
      //   path: 'add-scholarship',
      //   Component: AddScholarship
      // }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),

    children: [
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "applications",
        element: <MyApplication />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },
      // ✅ Moderator Routes
      {
        path: "moderator-profile",
        element: <ModeratorProfile />,
      },
      {
        path: "manage-scholarships",
        element: <ManageScholarships />,
      },
      {
        path: "all-reviews",
        element: <AllReviews />,
      },
      {
        path: "all-applications",
        element: <AllAppliedScholarships />,
      },
      {
        path: "add-scholarship",
        element: <AddScholarship />,
      },
      // admin
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "add-scholarship",
        element: <AddScholarship />,
      },
      // moderator
      // {
      //   path: 'manage-scholarships',
      //   element: <ManageScholarships />
      // },
      {
        path: "manage-applications",
        element: <ManageApplications />,
      },
      {
        path: "manage-reviews",
        element: <ManageReviews />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);
