import { useEffect, useState } from "react";

interface produto {
  tipo:string,
  sabor: string,
  estoque: number,
  preco: number,
  lucro:number,
  id: string,
  createdAt: string,
  updatedAt: string
}

interface produtoProto {
    tipo: string,
    sabor: string,
    preco: string,
    lucro: string| null
}

export default function Produtos() {

  let produtos: produto[] = [];
  const [useItem, setItem] = useState(produtos);
  const [useEdit, setEdit] = useState(false);
  const [useNovoProduto, setNovoProduto] = useState<produtoProto>({ tipo: "", sabor: "", preco: "",lucro:null })
  useEffect(() => {

    fetch('http://127.0.0.1:4000/produtos')
      .then(response => response.json())
      .then(response => setItem(response))
      .catch(err => console.error(err));

  }, produtos);


  function HandleSave(p: produto) {
    const newTipo = (document.getElementById(`${p.id}-tipo`) as HTMLInputElement).value;
    const newSabor = (document.getElementById(`${p.id}-sabor`) as HTMLInputElement).value;
    const newPreco = Number((document.getElementById(`${p.id}-preco`) as HTMLInputElement).value);
    const newLucro = Number((document.getElementById(`${p.id}-lucro`) as HTMLInputElement).value);

    setEdit(false);

    const newData = {
      tipo:newTipo,
      sabor:newSabor,
      preco:newPreco,
      lucro:newLucro,
      id:p.id
    }

    fetch('http://127.0.0.1:4000/produtos',
      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemProduto => {
        let listaProdutos: produto[] = useItem;
        listaProdutos = listaProdutos.map((item: produto) => {
          return item.id === itemProduto.id ? itemProduto : item;
        })
        setItem(listaProdutos);
      })
      .catch(err => console.error(err));
  }

  function HandleDelete(p: produto) {
    fetch('http://127.0.0.1:4000/produtos',
      {
        method: "DELETE",
        body: JSON.stringify({ id: p.id }),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemProduto => {
        let listaProdutos: produto[] = useItem;
        listaProdutos = listaProdutos.filter((item: produto) => itemProduto.id !== item.id)
        setItem(listaProdutos)
      })
      .catch(err => console.error(err));
  }

  async function HandleCreate(pProto: produtoProto): Promise<boolean> {
    let created = false;
    try {
        console.log(pProto)
      const req = await fetch('http://127.0.0.1:4000/produtos',
      
        {
          method: "POST",
          body: JSON.stringify(pProto),
          headers: { "Content-Type": "application/json" }
        }
      )
      const itemProduto = await req.json()
      setItem([...useItem, itemProduto])
      created = (!!itemProduto)


    }
    catch (err) {
      console.error(err)
      created = false
    }
    return created;


  }

  produtos = useItem;

  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">Clientes</h1>
      <div className="content-container flex justify-center items-center overflow-auto">
        <table className="w-full">
          <thead className="border-b-2 border-stone-500">
            <tr>
              <th className="font-quicksand text-left">Tipo</th>
              <th className="font-quicksand text-left">Sabor</th>
              <th className="font-quicksand text-left">Preço</th>
              <th className="font-quicksand text-left">Lucro</th>
              <th className="font-quicksand text-left">Estoque</th>
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            {useItem.map((p:produto) =>
              <tr key={p.id}>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? p.tipo : <input className="px-1 rounded" id={p.id + "-tipo"} type="text" defaultValue={p.tipo} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? p.sabor : <input className="px-2 rounded" id={p.id + "-sabor"} type="text" defaultValue={p.sabor} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? p.preco : <input className="px-2 rounded" id={p.id + "-preco"} type="text" defaultValue={p.preco} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? p.lucro : <input className="px-2 rounded" id={p.id + "-lucro"} type="text" defaultValue={p.lucro} />}
                </td>
                <td className="font-quicksand py-2 m-1 ">
                    {p.estoque}
                </td>
                <td className="flex justify-end">
                  {useEdit ? (
                    <button className="customButton" onClick={() => HandleSave(p)}>
                      Salvar
                    </button>
                  ) : (
                    <button className="customButton" onClick={() => setEdit(true)}>
                      Editar
                    </button>
                  )}
                  <button className="customButton" onClick={() => HandleDelete(p)}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
            <tr>
              <td className="font-quicksand py-2 m-1">
                {<input id={"TipoProduto"} className="px-2 rounded" type="text" placeholder="Tipo" onChange={(e) => {
                  setNovoProduto({ tipo: e.target.value,sabor:useNovoProduto.sabor, preco: useNovoProduto.preco, lucro:useNovoProduto.lucro })
                }} />}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"SaborProduto"} className="px-2 rounded" type="text" placeholder="Sabor" onChange={(e) => {
                  setNovoProduto({tipo: useNovoProduto.tipo,sabor:e.target.value, preco: useNovoProduto.preco, lucro:useNovoProduto.lucro })
                }} />}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"PrecoProduto"} className="px-2 rounded" type="text"  onChange={(e) => {
                  setNovoProduto({tipo: useNovoProduto.tipo,sabor:useNovoProduto.sabor, preco: e.target.value, lucro:useNovoProduto.lucro })
                }} />}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"LucroProduto"} className="px-2 rounded" type="text" onChange={(e) => {
                  setNovoProduto({tipo: useNovoProduto.tipo,sabor:useNovoProduto.sabor, preco: useNovoProduto.preco, lucro:e.target.value })
                }} />}
              </td>
              <td></td>
              <td className="flex justify-end">
                <button className="customButton" onClick={async () => {
                  const created = await HandleCreate(useNovoProduto)
                  if(created){
                    setNovoProduto({ tipo: "", sabor: "", preco: "",lucro:null })
                    let inputTipo = (document.getElementById(`TipoProduto`) as HTMLInputElement);
                    let inputSabor = (document.getElementById(`SaborProduto`) as HTMLInputElement);
                    let inputPreco = (document.getElementById(`PrecoProduto`) as HTMLInputElement);
                    let inputLucro = (document.getElementById(`LucroProduto`) as HTMLInputElement);
                    inputTipo.value  = "";
                    inputSabor.value = "";
                    inputPreco.value = "";
                    inputLucro.value = "";
                  }
                }}>
                  Criar!
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        {!useItem.length ? <p className="font-quicksand text-xl text-center my-3">Não há Produtos Cadastrados </p> : <></>}
    </section>
  )
};