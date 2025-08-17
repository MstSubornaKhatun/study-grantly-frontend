import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyProfile from "../pages/Dashboard/User/MyProfile";
// import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import ManageScholarships from "../pages/Dashboard/Moderator/ManageScholarships";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import AllAppliedScholarships from "../pages/Dashboard/Moderator/AllAppliedScholarships";
import AddScholarship from "../pages/Dashboard/Moderator/AddScholarship";
// import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
// import ManageApplications from "../pages/Dashboard/Admin/ManageApplications";
import AllScholarship from "../components/TopScholarship/AllScholarship";
import ScholarshipDetails from "../components/TopScholarship/ScholarshipDetails";
import ApplyScholarship from "../components/TopScholarship/ApplyScholarship";
import Payment from "../components/Payment/Payment";
import MyApplications from "../components/TopScholarship/MyApplications";
import NotFound from "../components/NotFound/NotFound";
import AdminRoute from "../routes/AdminRoute";
import ModeratorRoute from "../routes/ModeratorRoute";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import NoDataFound from "../components/NoDataFound/NoDataFound";
import ManageAppliedApplications from "../pages/Dashboard/Admin/ManageAppliedApplications";
import AnalyticsChart from "../pages/Dashboard/Admin/AnalyticsChart";
import AddScholarshipAdmin from "../pages/Dashboard/Admin/AddScholarshipAdmin";
import ManageScholarshipsAdmin from "../pages/Dashboard/Admin/ManageScholarshipsAdmin";
// import ManageScholarshipsAdmin from "../pages/Dashboard/Admin/ManageApplicationsAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound/>,
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
      {
        path: "/my-applications",
        element: <MyApplications />,
      },
      {
        path: "/not",
        element: <NoDataFound/>,
      },
      {
       path:"/payment/:id",
       element:<PrivateRoute><Payment /></PrivateRoute>
      },
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
      <PrivateRoute>  <DashboardLayout></DashboardLayout></PrivateRoute>  
     
     
    ),
      errorElement: <NotFound/>,

    children: [
      {
        path: "profile",
        element: <MyProfile/> ,
      },
      {
        path: "my-applications",
        element:  <MyApplications />,
      },
      {
        path: "my-applications",
        element:  <MyApplications />,
      },
      {
        path: "reviews",
        element:  <MyReviews />,
      },
      // moderator
      // {
      //   path: "moderator-profile",
      //   element: <ModeratorRoute> <ModeratorProfile /> </ModeratorRoute>  ,
      // },
      {
        path: "manage-scholarships",
        element: <ModeratorRoute> <ManageScholarships /> </ModeratorRoute> ,
      },
      {
        path: "all-reviews",
        element: <ModeratorRoute>  <AllReviews /> </ModeratorRoute>,
      },
      {
        path: "all-applications",
        element: <ModeratorRoute> <AllAppliedScholarships /> </ModeratorRoute> ,
      },
      {
        path: "add-scholarship",
        element:<ModeratorRoute><AddScholarship />  </ModeratorRoute> ,
      },
// admin
     {
        path: "manage-scholarships-admin",
        element: <AdminRoute> <ManageScholarshipsAdmin /> </AdminRoute> ,
      },
      {
        path: "add-scholarship-admin",
        element:<AdminRoute><AddScholarshipAdmin />  </AdminRoute> ,
      },
    


      {
        path: "manage-reviews",
        element: <AdminRoute> <ManageReviews /> </AdminRoute>,
      },
      {
        path: "manage-applied-applications",
        element: <AdminRoute> <ManageAppliedApplications /> </AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute> <ManageUsers /></AdminRoute>,
      },
      {
        path: "analytics",
        element: <AdminRoute> <AnalyticsChart /></AdminRoute>,
      },
    ],
  },
]);
