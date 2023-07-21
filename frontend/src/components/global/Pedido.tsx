import { useEffect, useState } from "react";


  interface Item {
    produtoId: string;
    quantidade: number;
    valor: number;
  }


interface Pedido {
  id: string;
  idCliente: string;
  nomeCliente?: string;
  valor_total?: Number;
  itens: Item[];
}

interface props {
  counter: number;
  pedido: Pedido;
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

let isOpen: boolean;

function nomeProduto(p:produto| undefined):string{
  if(!p){
    console.log(p);
      return "*"
      
  }
  else{
      return p.tipo +" / "+p.sabor;
  }
}

export default function Pedido(p:props) {

  

  const produtos:produto[] = [];
  const pedido: Pedido = (p.pedido)
  const lista:Item[] =[];
  const [useInfo, setInfo] = useState(pedido);
  const [useLista,setLista] = useState(lista)
  
  const [useProdutos, setProdutos] = useState(produtos);
useEffect(() => {

    fetch('http://127.0.0.1:4000/produtos')
      .then(response => response.json())
      .then(response => setProdutos(response))
      .catch(err => console.error(err));

  }, produtos);
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
      let itens: Item[];
      await fetch(`http://127.0.0.1:4000/clientes?id=${p.pedido.idCliente}`)
        .then((response) => response.json())
        .then((response) => (cliente = response))
        .catch((err) => console.error(err));

      await fetch(`http://localhost:4000/pedidos?id=${p.pedido.id}`)
        .then((response) => response.json())
        .then((response) => ({pedido,itens} = response))
        .then(() => {
          setInfo({
            id: pedido.id,
            idCliente: pedido.idCliente,
            nomeCliente: cliente.nome,
            valor_total: pedido.valor_total,
            itens: itens,
          });
          setLista(itens)
          console.log(useInfo)
        })
        .catch((err) => console.error(err));
    }else{
      isOpen = false;
    }
  }

  return (
    <div key={p.pedido.id} className="w-full justify-between">
      <button
        className="accordion py-5 px-5 rounded hover:bg-rv-secondary "
        onClick={(e) => handleExpand(e.currentTarget)}
      >
        Pedido n° {p.counter}
      </button>

      <div className="panel flex flex-row justify-between">
        <div className="flex flex-col justify-around font-semibold ">
          <p>Cliente: {useInfo.nomeCliente}</p>
          <p>Valor Total: R${useInfo.valor_total?.toString()}</p>
          </div>
          <div>
          <table className="w-full ">
            <thead> 
              <tr className="border-b-2 border-stone-500 border-dotted">
                <th className="font-quicksand text-left px-2">Produto</th> 
                <th className="font-quicksand text-left px-2 ">Quantidade:</th>
                 <th className="font-quicksand text-left px-2">Preço do Item:</th>
              </tr>
            </thead>
          <tbody>

          
          
            {useLista.map((item:Item) => 
              <tr id={item.produtoId + useInfo.id}>
                <td id={item.produtoId + useInfo.id+"nomeproduto"} className="font-quicksand py-2 m-1 text-center">
                   {nomeProduto(useProdutos.find((p:produto)=> p.id === item.produtoId))}</td>
                <td id={item.produtoId + useInfo.id+"quantidadeProduto"} className="font-quicksand py-2 m-1 text-center">{(item.quantidade*1000).toString()}(g)</td>
                <td id={item.produtoId + useInfo.id+"valorItem"} className="font-quicksand py-2 m-1 text-center"> R${item.valor.toString()} </td>
              </tr>
              
          )}
          </tbody>
          </table>
          </div>
          
        </div>
      </div>
  );
}
