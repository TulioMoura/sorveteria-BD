import { useEffect, useState } from "react";

import "../css/Accordion.css";
import Pedido from "../components/global/Pedido";

interface ItemProto {
  produtoId:string;
  quantidade: Number;
}

interface Item{
  produtoId:string;
  quantidade:Number;
  valor:Number;
}
interface pedido {
  valor_total:Number;
  id: string;
  idCliente: string;
  itens: Item[];
}


interface pedidoProto{
  idCliente:string;
  itens:ItemProto[];
}

interface produto{
  tipo:string,
sabor: string,
estoque: number,
preco: number,
lucro:number,
id: string,
createdAt: string,
updatedAt: string
}

interface cliente{
  nome: string,
  telefone: string,
  endereco: string,
  id: string,
  createdAt: string,
  updatedAt: string
}

export default function Pedidos() {
  let pedidos: pedido[] = [];
  let produtos: produto[] = [];
  let clientes : cliente[] = [];

  const [useItem, setItem] = useState(pedidos);
  const [useEdit, setEdit] = useState(false);
  const [useProdutos, setProdutos] = useState(produtos);
  const[useClientes, setClientes] = useState(clientes);
  const [useNovoPedido,setNovoPedido] = useState({idCliente:"",itens:[]})
  const [useItemList,setItemList] = useState([])


  let counter = 0;

  useEffect(() => {
    fetch("http://localhost:4000/pedidos")
      .then((response) => response.json())
      .then((response) => setItem(response))
      .catch((err) => console.error(err));
  }, pedidos);

  useEffect(() => {

    fetch('http://127.0.0.1:4000/produtos')
      .then(response => response.json())
      .then(response =>setProdutos(response))
      .catch(err => console.error(err));

  }, produtos);

  useEffect(() => {

    fetch('http://127.0.0.1:4000/clientes')
      .then(response => response.json())
      .then(response => setClientes(response))
      .catch(err => console.error(err));

  }, clientes);

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
        console.log(novaList)
        setItem(novaList);
      })
      .catch((err) => console.error(err));
  }
  async function HandleCreate(pProto:pedidoProto): Promise<boolean> {
    let created = false;
    try {
        console.log(pProto)
      const req = await fetch('http://127.0.0.1:4000/pedidos',
      
        {
          method: "POST",
          body: JSON.stringify(pProto),
          headers: { "Content-Type": "application/json" }
        }
      )
      const itemPedido = await req.json()
      setItem([...useItem, itemPedido])
      created = (!!itemPedido)


    }
    catch (err) {
      console.error(err)
      created = false
    }
    return created;


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
