import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

export default function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/home", element: <Home /> },
        { path: "/clientes", element: <div>clientes</div> },
        { path: "/fornecedores", element: <div>fornecedores</div> },
        { path: "/pedidos", element: <div>pedidos</div> },
        { path: "/produtos", element: <div>produtos</div> },
      ])}
    />
  );
}
