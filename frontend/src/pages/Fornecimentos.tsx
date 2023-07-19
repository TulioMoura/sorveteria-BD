import { useEffect, useState } from "react";

interface fornecimento {
  id:string,
  produtoId: string,
  cnpjFornecedor: string,
  quantidade: number,
  valorTotal:number,
  createdAt: string,
  updatedAt: string
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

interface fornecedor {
    nome: string,
    telefone: string,
    cnpj: string,
    createdAt: string,
    updatedAt: string
  }

interface fornecimentoProto {
    produtoId: string,
  cnpjFornecedor: string,
  quantidade: number,
  valorTotal:number
}

export default function Fornecimentos() {

  let fornecimentos: fornecimento[] = [];
  let produtos : produto[] = [];
  let fornecedores : fornecedor[] = [];

  const [useItem, setItem] = useState(fornecimentos);
  const [useFornecedores, setFornecedores] = useState(fornecedores);
  const [useProdutos, setProdutos] = useState(produtos);
  const [useEdit, setEdit] = useState(false);
  const [useNovoFornecimento, setNovoFornecimento] = useState<fornecimentoProto>({ produtoId: "", cnpjFornecedor: "", quantidade: 0,valorTotal :0 })
  useEffect(() => {

    fetch('http://127.0.0.1:4000/fornecimentos')
      .then(response => response.json())
      .then(response => setItem(response))
      .catch(err => console.error(err));
      console.log(fornecimentos)

  }, fornecimentos);
  useEffect(() => {

    fetch('http://127.0.0.1:4000/produtos')
      .then(response => response.json())
      .then(response =>setProdutos(response))
      .catch(err => console.error(err));

  }, produtos);
  useEffect(() => {

    fetch('http://127.0.0.1:4000/fornecedores')
      .then(response => response.json())
      .then(response =>setFornecedores(response))
      .catch(err => console.error(err));

  }, fornecedores);
//override
  function HandleSave(f:fornecimento) {
    const newQtd = (document.getElementById(`${f.id}-quantidade`) as HTMLInputElement).value;
    const newValor = (document.getElementById(`${f.id}-custo`) as HTMLInputElement).value;

    setEdit(false);

    const newData = {
      id:f.id,
      quantidade:newQtd,
      valorTotal:newValor
    }

    fetch('http://127.0.0.1:4000/fornecimentos',
      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemFornecimento => {
        let listaFornecimentos: fornecimento[] = useItem;
        listaFornecimentos = listaFornecimentos.map((item: fornecimento) => {
          return item.id === itemFornecimento.id ? itemFornecimento : item;
        })
        setItem(listaFornecimentos);
      })
      .catch(err => console.error(err));
  }
  //override
  function HandleDelete(f: fornecimento) {
    fetch('http://127.0.0.1:4000/fornecimentos',
      {
        method: "DELETE",
        body: JSON.stringify({ id: f.id }),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemFornecimento => {
        let listaFornecimentos: fornecimento[] = useItem;
        listaFornecimentos = listaFornecimentos.filter((item: fornecimento) => itemFornecimento.id !== item.id)
        setItem(listaFornecimentos)
      })
      .catch(err => console.error(err));
  }
//override
  async function HandleCreate(fProto: fornecimentoProto): Promise<boolean> {
    let created = false;
    try {
        console.log(fProto)
      const req = await fetch('http://127.0.0.1:4000/fornecimentos',
      
        {
          method: "POST",
          body: JSON.stringify(fProto),
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
function nomeProduto(p:produto| undefined):string{
    if(!p){
        return "*"
    }
    else{
        return p.tipo +" / "+p.sabor;
    }
}
function formatData(d:string):string{
    const data = new Date(Date.parse(d))
    return data.toLocaleDateString('pt-BR')
}
  fornecimentos = useItem;

  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">Fornecimentos</h1>
      <div className="content-container flex justify-center items-center overflow-auto">
        <table className="w-full">
          <thead className="border-b-2 border-stone-500">
            <tr>
              <th className="font-quicksand text-left">Produto</th>
              <th className="font-quicksand text-left">Fornecedor</th>
              <th className="font-quicksand text-left">Quantidade</th>
              <th className="font-quicksand text-left">Custo</th>
              <th className="font-quicksand text-left">Data:</th>
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            {useItem.map((f:fornecimento) =>
            
              <tr key={f.id}>
                <td className="font-quicksand py-2 m-1">
                  {nomeProduto(useProdutos.find(produto=>produto.id === f.produtoId))}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {(useFornecedores.find( fornecedor => fornecedor.cnpj === f.cnpjFornecedor))?.nome}
                </td>
                
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? f.quantidade : <input className="px-2 rounded" id={f.id + "-quantidade"} type="text" defaultValue={f.quantidade} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? f.valorTotal : <input className="px-2 rounded" id={f.id + "-custo"} type="text" defaultValue={f.valorTotal} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {formatData(f.createdAt)}
                </td>
                
                <td className="flex justify-end">
                  {useEdit ? (
                    <button className="customButton" onClick={() => HandleSave(f)}>
                      Salvar
                    </button>
                  ) : (
                    <button className="customButton" onClick={() => setEdit(true)}>
                      Editar
                    </button>
                  )}
                  <button className="customButton" onClick={() => HandleDelete(f)}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
            <tr>
              <td className="font-quicksand py-2 m-1">
                {<select id={"IdProduto"} className="px-2 rounded" placeholder="Tipo" onChange={(e) => {
                    let temp = useNovoFornecimento;
                    temp.produtoId =e.target.value 
                  setNovoFornecimento(temp)
                }}><option />
                    {useProdutos.map((item:produto)=>
                        <option key={item.id} value={item.id}>{nomeProduto(item)}</option>
                        )}
                </select>    
                    }
              </td>
              <td className="font-quicksand py-2 m-1">
                {<select id={"IdFornecedor"} className="px-2 rounded"placeholder="Sabor" onChange={(e) => {
                    let temp = useNovoFornecimento;
                    temp.cnpjFornecedor =e.target.value 
                  setNovoFornecimento(temp)
                }} ><option />
                    {useFornecedores.map((item:fornecedor)=>
                        <option key={item.cnpj} value={item.cnpj}>{item.nome}</option>
                        )}
                    </select>}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"QuantidadeFornecimento"} className="px-2 rounded" type="text"  onChange={(e) => {
                  let temp = useNovoFornecimento;
                  temp.quantidade = Number(e.target.value) 
                setNovoFornecimento(temp)
                }} />}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"CustoFornecimento"} className="px-2 rounded" type="text" onChange={(e) => {
                  let temp = useNovoFornecimento;
                  temp.valorTotal = Number(e.target.value) 
                setNovoFornecimento(temp)
                }} />}
              </td>
              <td></td>
              
              <td className="flex justify-end">
                <button className="customButton" onClick={async () => {
                    console.log(useNovoFornecimento)
                  const created = await HandleCreate(useNovoFornecimento)
                  if(created){
                    setNovoFornecimento({ produtoId: "", cnpjFornecedor: "", quantidade: 0,valorTotal :0 })
                    let inputPreco = (document.getElementById(`CustoFornecimento`) as HTMLInputElement);
                    let inputQuantidade = (document.getElementById(`QuantidadeFornecimento`) as HTMLInputElement);
                    inputPreco.value = "";
                    inputQuantidade.value = "";
                  }
                }}>
                  Criar!
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        {!useItem.length ? <p className="font-quicksand text-xl text-center my-3">Não há produtos cadastrados </p> : <></>}
    </section>
  )
};