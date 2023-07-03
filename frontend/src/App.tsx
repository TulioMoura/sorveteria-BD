import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />
  },

]);

export default function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
};

