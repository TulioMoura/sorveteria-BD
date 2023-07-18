import { useEffect, useState } from "react"

interface fornecedor {
  nome: string,
  telefone: string,
  cnpj: string,
  createdAt: string,
  updatedAt: string
}

interface fornecedorProto{
  nome:string,
  telefone:string,
  cnpj:string
}

export default function Fornecedores() {
    let fornecedores:fornecedor[] = []
  const [useItem, setItem] = useState(fornecedores);
  const [useEdit, setEdit] = useState(false);
  const [useNovoFornecedor,setNovoFornecedor] = useState<fornecedorProto>({nome:"",cnpj:"",telefone:""})
  useEffect(() => {

    fetch('http://127.0.0.1:4000/fornecedores')
      .then(response => response.json())
      .then(response => setItem(response))
      .catch(err => console.error(err));

  },fornecedores);


  function HandleSave(f: fornecedor) {
    const newNome = (document.getElementById(`${f.cnpj}-nome`) as HTMLInputElement).value;
    const newTel = (document.getElementById(`${f.cnpj}-telefone`) as HTMLInputElement).value;
    

    setEdit(false);

    const newData = {
      nome: newNome,
      telefone: newTel,
      cnpj: f.cnpj
    }

    fetch('http://127.0.0.1:4000/fornecedores',
      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemFornecedor => {
        let listaFornecedores: fornecedor[] = useItem;
        listaFornecedores = listaFornecedores.map((item:fornecedor) => {
          return item.cnpj=== itemFornecedor.cnpj? itemFornecedor : item;
        })
        setItem(listaFornecedores)
      })
      .catch(err => console.error(err));
  }

  function HandleDelete(f:fornecedor){
    console.log(f)
    fetch('http://127.0.0.1:4000/fornecedores',
      {
        method: "DELETE",
        body: JSON.stringify({cnpj:f.cnpj}),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemFornecedor => {
        let listaFornecedores: fornecedor[] = useItem;
        listaFornecedores = listaFornecedores.filter((item:fornecedor) => itemFornecedor.cnpj !== item.cnpj)
        setItem(listaFornecedores)
      })
      .catch(err => console.error(err));
  }

  async function HandleCreate(fProto: fornecedorProto): Promise<boolean> {
    let created = false;
    try {
      const req = await fetch('http://127.0.0.1:4000/fornecedores',
        {
          method: "POST",
          body: JSON.stringify(fProto),
          headers: { "Content-Type": "application/json" }
        }
      )
      const itemFornecedor = await req.json()
      setItem([...useItem, itemFornecedor])
      created = (!!itemFornecedor)


    }
    catch (err) {
      console.error(err)
      created = false
    }
    
    return created;


  }
  fornecedores = useItem;

  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">Clientes</h1>
      <div className="content-container flex justify-center items-center overflow-auto">
        <table className="w-full">
          <thead className="border-b-2 border-stone-500">
            <tr>
              <th className="font-quicksand text-left">Nome</th>
              <th className="font-quicksand text-left">Telefone</th>
              <th className="font-quicksand text-left">Cnpj</th>
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            {useItem.map((f: fornecedor) =>
              <tr key={f.cnpj}>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? f.nome : <input id={f.cnpj + "-title"} type="text" defaultValue={f.nome} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? f.telefone : <input id={f.cnpj + "-telefone"} type="text" defaultValue={f.telefone} />}
                </td>
                <td className= " font-quicksand py-2 m-1 " id={f.cnpj + `-endereco`}>
                  {f.cnpj } 
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
                  {<input id={"NomeFornecedor"} type="text" placeholder="Nome" onChange={(e)=>{
                    setNovoFornecedor({nome:e.target.value, cnpj:useNovoFornecedor.cnpj,telefone: useNovoFornecedor.telefone})
                  }} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {<input id={"TelefoneFornecedor"} type="text" placeholder="Telefone" onChange={(e)=>{
                    setNovoFornecedor({nome:useNovoFornecedor.nome, cnpj:useNovoFornecedor.cnpj,telefone: e.target.value})
                  }}/>}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {<input id={"CNPJFornecedor"} type="text" placeholder="Endereço" onChange={(e)=>{
                    setNovoFornecedor({nome:useNovoFornecedor.nome, cnpj:e.target.value ,telefone: useNovoFornecedor.telefone})
                  }}/>}
                </td>
                <td className="flex justify-end">
                  
                    <button className="customButton" onClick={async() =>{
                       const created  = await HandleCreate (useNovoFornecedor) 

                       if(created){
                        setNovoFornecedor({nome:"",cnpj:"",telefone:""})
                        let inputNome = (document.getElementById(`NomeFornecedor`) as HTMLInputElement);
                        let inputCNPJ = (document.getElementById(`CNPJFornecedor`) as HTMLInputElement);
                        let inputTelefone = (document.getElementById(`TelefoneFornecedor`) as HTMLInputElement);

                        inputNome.value = "";
                        inputCNPJ.value = "";
                        inputTelefone.value = "";
                       }
                       
                       } }>
                       Criar!
                    </button>

                  
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      {!useItem.length ? <h4 className=" text-2xl text-center p-5">Não há clientes Cadastrados </h4>: <></>}
    </section>
  )
};
