import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/miniPage/About";
import ContactUs from "../pages/miniPage/ContactUs";
import PrivacyPolicy from "../pages/miniPage/PrivacyPolicy";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: Home },
      { path: "about-us", Component: About },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "contact-us", Component: ContactUs },
    ],
  },
]);

export default router;
