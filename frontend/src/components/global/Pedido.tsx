import { useState } from "react";

interface Item {}

interface Pedido {
  id: string;
  idCliente: string;
  nomeCliente?: string;
  valorTotal?: string;
  itens: Item[];
}

interface props {
  counter: number;
  pedido: Pedido;
}

let isOpen: boolean;

export default function Pedido(p: props) {
  const [useInfo, setInfo] = useState(p.pedido);
  const [useEdit, setEdit] = useState(false);

  async function handleExpand(e: HTMLButtonElement) {

    e.classList.toggle("expanded");

    let panel = e.nextElementSibling as HTMLElement;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = "";
    } else {
      panel.style.maxHeight = panel.scrollHeight + 15 + "px";
    }

    if (!isOpen) {
      isOpen = true;

      let cliente: any;
      let pedido: Pedido;
      await fetch(`http://127.0.0.1:4000/clientes?id=${p.pedido.idCliente}`)
        .then((response) => response.json())
        .then((response) => (cliente = response))
        .catch((err) => console.error(err));

      await fetch("http://localhost:4000/pedidos/")
        .then((response) => response.json())
        .then((response) => (pedido = response))
        .then(() => {
          setInfo({
            id: p.pedido.id,
            idCliente: p.pedido.idCliente,
            nomeCliente: cliente.nome,
            valorTotal: pedido.valorTotal,
            itens: pedido.itens,
          });
        })
        .catch((err) => console.error(err));
    }else{
      isOpen = false;
    }
  }

  return (
    <div key={p.pedido.id} className="w-full justify-between">
      <button
        className="accordion py-5 px-5 rounded hover:bg-rv-secondary"
        onClick={(e) => handleExpand(e.currentTarget)}
      >
        Pedido n° {p.counter}
      </button>

      <div className="panel flex flex-col">
        <div>
          <p>ID do cliente: {useInfo.idCliente}</p>
          <p>ID do Pedido: {useInfo.id}</p>
          <p>Nome do Cliente: {useInfo.nomeCliente}</p>
          <p>Itens: </p>
          <ul>{}</ul>
        </div>
      </div>
    </div>
  );
}
