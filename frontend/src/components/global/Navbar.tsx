export default function Navbar() {
  return (
    <>
      <nav className="h-12 w-screen bg-rv-primary absolute">
        <div className="mx-auto container flex flex-wrap justify-between content-center h-full px-2 relative">
          <div>
            <a href="/home">
              <img
                className="max-h-8"
                src="https://cdn-icons-png.flaticon.com/512/1958/1958543.png"
                alt="Sorveteria Logo"
              />
            </a>
          </div>
          <label htmlFor="dropdown-menu" className="sm:hidden customButton">Menu</label>
          <input id="dropdown-menu" type="checkbox" className="peer/menu hidden"></input>
          <div className="hidden peer-checked/menu:flex flex-col peer-checked/menu:absolute end-1 bg-rv-primary peer-checked/menu:p-3 sm:block rounded top-12">
            <a href="/clientes" className="customButton">
              Clientes
            </a>
            <a href="/fornecedores" className="customButton">
              Fornecedores
            </a>
            <a href="/pedidos" className="customButton">
              Pedidos
            </a>
            <a href="/produtos" className="customButton">
              produtos
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
