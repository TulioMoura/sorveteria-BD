import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Fornecedores from "./pages/Fornecedores";

export default function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/clientes", element: <Clientes /> },
        { path: "/fornecedores", element: <Fornecedores/> },
        { path: "/pedidos", element: <div>pedidos</div> },
        { path: "/produtos", element: <div>produtos</div> },
      ])}
    />
  );
}
