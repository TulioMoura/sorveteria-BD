import { useEffect, useState } from "react";

interface cliente {
  nome: string,
  telefone: string,
  endereco: string,
  id: string,
  createdAt: string,
  updatedAt: string
}

interface clienteProto {
  nome: string,
  telefone: string,
  endereco: string
}

export default function Clientes() {

  let clientes: cliente[] = [];
  const [useItem, setItem] = useState(clientes);
  const [useEdit, setEdit] = useState(false);
  const [useNovoCliente, setNovoCliente] = useState<clienteProto>({ nome: "", endereco: "", telefone: "" })
  useEffect(() => {

    fetch('http://127.0.0.1:4000/clientes')
      .then(response => response.json())
      .then(response => setItem(response))
      .catch(err => console.error(err));

  }, clientes);


  function HandleSave(c: cliente) {
    const newNome = (document.getElementById(`${c.id}-title`) as HTMLInputElement).value;
    const newTel = (document.getElementById(`${c.id}-telefone`) as HTMLInputElement).value;
    const newAddr = (document.getElementById(`${c.id}-endereco`) as HTMLInputElement).value;


    setEdit(false);

    const newData = {
      nome: newNome,
      telefone: newTel,
      endereco: newAddr,
      id: c.id
    }

    fetch('http://127.0.0.1:4000/clientes',
      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemCliente => {
        let listaClientes: cliente[] = useItem;
        listaClientes = listaClientes.map((item: cliente) => {
          return item.id === itemCliente.id ? itemCliente : item;
        })
        setItem(listaClientes);
      })
      .catch(err => console.error(err));
  }

  function HandleDelete(c: cliente) {
    fetch('http://127.0.0.1:4000/clientes',
      {
        method: "DELETE",
        body: JSON.stringify({ id: c.id }),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemCliente => {
        let listaClientes: cliente[] = useItem;
        listaClientes = listaClientes.filter((item: cliente) => itemCliente.id !== item.id)
        setItem(listaClientes)
      })
      .catch(err => console.error(err));
  }

  function HandleCreate(cProto: clienteProto) {
    fetch('http://127.0.0.1:4000/clientes',
      {
        method: "POST",
        body: JSON.stringify(cProto),
        headers: { "Content-Type": "application/json" }
      }
    ).then(response => response.json())
      .then(itemCliente => {
        setItem([...useItem, itemCliente])
      })
      .catch(err => console.error(err));
  }

  clientes = useItem;

  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">Clientes</h1>
      <div className="content-container flex justify-center items-center overflow-auto">
        <table className="w-full">
          <thead className="border-b-2 border-stone-500">
            <tr>
              <th className="font-quicksand text-left">Nome</th>
              <th className="font-quicksand text-left">Telefone</th>
              <th className="font-quicksand text-left">Endereço</th>
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            {useItem.map((c: cliente) =>
              <tr key={c.id}>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? c.nome : <input className="px-2 rounded" id={c.id + "-title"} type="text" defaultValue={c.nome} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? c.telefone : <input className="px-2 rounded" id={c.id + "-telefone"} type="text" defaultValue={c.telefone} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? c.endereco : <input className="px-2 rounded" id={c.id + "-endereco"} type="text" defaultValue={c.endereco} />}
                </td>
                <td className="flex justify-end">
                  {useEdit ? (
                    <button className="customButton" onClick={() => HandleSave(c)}>
                      Salvar
                    </button>
                  ) : (
                    <button className="customButton" onClick={() => setEdit(true)}>
                      Editar
                    </button>
                  )}
                  <button className="customButton" onClick={() => HandleDelete(c)}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
            <tr>
              <td className="font-quicksand py-2 m-1">
                {<input id={"NomeNovoCliente"} className="px-2 rounded" type="text" placeholder="Nome" onChange={(e) => {
                  setNovoCliente({ nome: e.target.value, endereco: useNovoCliente.endereco, telefone: useNovoCliente.telefone })
                }} />}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"TelefoneCliente"} className="px-2 rounded" type="text" placeholder="Telefone" onChange={(e) => {
                  setNovoCliente({ nome: useNovoCliente.nome, endereco: useNovoCliente.endereco, telefone: e.target.value })
                }} />}
              </td>
              <td className="font-quicksand py-2 m-1">
                {<input id={"EnderecoCliente"} className="px-2 rounded" type="text" placeholder="Endereço" onChange={(e) => {
                  setNovoCliente({ nome: useNovoCliente.nome, endereco: e.target.value, telefone: useNovoCliente.telefone })
                }} />}
              </td>
              <td className="flex justify-end">
                <button className="customButton" onClick={() => {
                  HandleCreate(useNovoCliente)
                  setNovoCliente({ nome: "", endereco: "", telefone: "" })
                }}>
                  Criar!
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        {!useItem.length ? <p className="font-quicksand text-xl text-center my-3">Não há clientes Cadastrados </p> : <></>}
    </section>
  )
};
