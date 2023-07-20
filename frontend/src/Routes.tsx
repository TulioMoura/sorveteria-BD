import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Fornecedores from "./pages/Fornecedores";
import Produtos from "./pages/Produtos";
import Fornecimentos from "./pages/Fornecimentos";
import Pedidos from "./pages/Pedidos";

export default function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/clientes", element: <Clientes /> },
        { path: "/fornecedores", element: <Fornecedores/> },
        { path: "/fornecimentos", element: <Fornecimentos/>},
        { path: "/pedidos", element: <Pedidos />},
        { path: "/produtos", element: <Produtos/> },
      ])}
    />
  );
}
