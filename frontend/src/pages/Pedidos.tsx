import { useEffect, useState } from "react";

import "../css/Accordion.css";
import Pedido from "../components/global/Pedido";

interface ItemProto {
  produtoId: string;
  quantidade: number;
}

interface Item {
  produtoId: string;
  quantidade: number;
  valor: number;
}
interface pedido {
  valor_total: number;
  id: string;
  idCliente: string;
  itens: Item[];
}


interface pedidoProto {
  idCliente: string;
  itens: ItemProto[];
}

interface produto {
  tipo: string,
  sabor: string,
  estoque: number,
  preco: number,
  lucro: number,
  id: string,
  createdAt: string,
  updatedAt: string
}

interface cliente {
  nome: string,
  telefone: string,
  endereco: string,
  id: string,
  createdAt: string,
  updatedAt: string
}

function nomeProduto(p:produto| undefined):string{
  if(!p){
    console.log(p);
      return "*"
      
  }
  else{
      return p.tipo +" / "+p.sabor;
  }
}

export default function Pedidos() {
  let pedidos: pedido[] = [];
  let produtos: produto[] = [];
  let clientes: cliente[] = [];
  let listaItems: ItemProto[] =[]
  let currentItem:ItemProto = {produtoId:"",quantidade:0};
  let pedidoProtoItem: pedidoProto = {idCliente: "", itens : []};

  const [useItem, setItem] = useState(pedidos);
  const [useEdit, setEdit] = useState(false);
  const [useProdutos, setProdutos] = useState(produtos);
  const [useClientes, setClientes] = useState(clientes);
  const [useNovoPedido, setNovoPedido] = useState(pedidoProtoItem)
  const [useItemList, setItemList] = useState(listaItems)
  


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
      .then(response => setProdutos(response))
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
  async function HandleCreate(pProto: pedidoProto): Promise<boolean> {
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
        <div className="px-2 rounded">
          Cliente:
        </div>
        
        <select id={"IdCliente"} className="px-2 rounded" placeholder="Tipo" onChange={(e) => {
          let temp = useNovoPedido;
          temp.idCliente = e.target.value
          setNovoPedido(temp)
        }}><option />
          {useClientes.map((item: cliente) =>
            <option key={item.id} value={item.id}>{item.nome}</option>
          )}
        </select>

        <div className="px-2 rounded">
          Produto:
        </div>
          <select id={"IdProduto"} className="px-2 rounded" placeholder="Tipo" onChange={(e) => {
          currentItem.produtoId = e.target.value;
        }}><option />
          {useProdutos.map((item: produto) =>
            <option key={item.id} value={item.id}>{nomeProduto(item)}</option>
          )}
        </select>
        <div className="px-2 rounded">
          <input id="qtdProduto" className="px-2 rounded" placeholder="Quantidade(gramas)" type="text" onChange={(e)=>{
            currentItem.quantidade = Number( e.target.value )/1000
        }}/>
        </div>
        
        <button className="customButton" onClick={async () => {
          setItemList([...useItemList,currentItem])
          
          let inputProduto = (document.getElementById(`IdProduto`) as HTMLInputElement);
          let inputqtd = (document.getElementById(`qtdProduto`) as HTMLInputElement);
          inputProduto.value = "";
          inputqtd.value ="";
        }}>
          Adicionar item
        </button>
        </div>
        
        
<div className="content-container flex justify-center items-center overflow-auto">
        
        <table className="w-full">
          { (useItemList) ? <thead className="border-b-2 border-stone-500" >
            <tr>
              <th className="font-quicksand text-left" >
          Item
        </th>
        <th className="font-quicksand text-left">
          Quantidade
        </th>
            </tr>
          </thead>: <></>}
          
        <tbody className=" divide-y divide-stone-500 divide-dotted">
          {useItemList.map((item:ItemProto) =>
            <tr id={item.produtoId }>
              <td className="font-quicksand py-2 m-1" id = {item.produtoId + "-nome-produto"}>{ nomeProduto(useProdutos.find((i:produto) => item.produtoId === i.id)) }</td>
              <td className="font-quicksand py-2 m-1" id= {item.produtoId +"qtd-produto"}> <>{(item.quantidade*1000)}</></td>
            </tr>
          )}
        </tbody>
          
        
        

        </table>

        

      </div>
      <div className="content-container flex justify-center items-center overflow-auto">
<button className="customButton" onClick={async () => {
          console.log(useNovoPedido)
          let temp:pedidoProto = useNovoPedido;
          temp.itens = useItemList;
          setNovoPedido(temp)
          const created = await HandleCreate(useNovoPedido)
          if (created) {
            setNovoPedido({ idCliente: "", itens: [] })
            setItemList(listaItems);
          }
        }}>
          Criar pedido!
        </button>
      </div>
        
        


      <div className="content-container flex justify-center items-center overflow-auto">
        <ul className="w-full divide-y divide-stone-500 divide-dotted">
          {useItem.map((p: pedido) => {
            ++counter;
            return (
              <li key={p.id} className="flex py-5">
                <Pedido pedido={p} counter={counter} />
                <button
                  className="customButton  h-14  px-5"
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
