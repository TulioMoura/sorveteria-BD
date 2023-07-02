import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path:"/",
    element: <div>Hello, World!</div>
  },
]);

export default function App(){

  return <RouterProvider router={router} />
};


