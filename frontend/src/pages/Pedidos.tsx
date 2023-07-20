import { useEffect, useState } from "react";

import "../css/Accordion.css";
import Pedido from "../components/global/Pedido";

interface Item {}

interface pedido {
  id: string;
  idCliente: string;
  itens: Item[];
}

export default function Pedidos() {
  let pedidos: pedido[] = [];

  const [useItem, setItem] = useState(pedidos);
  const [useEdit, setEdit] = useState(false);

  let counter = 0;

  useEffect(() => {
    fetch("http://localhost:4000/pedidos")
      .then((response) => response.json())
      .then((response) => setItem(response))
      .catch((err) => console.error(err));
  }, pedidos);

  function handleDelete(p: pedido) {
    fetch("http://127.0.0.1:4000/pedidos", {
      method: "DELETE",
      body: JSON.stringify({ id: p.id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((pedido) => {
        let novaList: pedido[] = useItem;
        novaList = novaList.filter((item: pedido) => pedido.id !== item.id);
        setItem(novaList);
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">
        Pedidos
      </h1>
      <div className="content-container flex justify-center items-center overflow-auto">
        <ul className="w-full divide-y divide-stone-500 divide-dotted">
          {useItem.map((p: pedido) => {
            ++counter;
            return (
              <li key={p.id} className="flex py-5">
                <Pedido pedido={p} counter={counter} />
                <button
                  className="customButton"
                  onClick={() => handleDelete(p)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {!useItem.length ? (
        <p className="font-quicksand text-xl text-center my-3">
          Não há Pedidos cadastrados{" "}
        </p>
      ) : (
        <></>
      )}
    </section>
  );
}
