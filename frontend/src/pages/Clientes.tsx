import { useEffect, useState } from "react"

interface cliente {
  nome: string,
  telefone: string,
  endereco: string,
  id: string,
  createdAt: string,
  updatedAt: string
}

export default function Clientes() {

  let clientes: cliente[] = [];
  const [useItem, setItem] = useState(clientes);
  const [useEdit, setEdit] = useState(false);

  useEffect(() => {

    fetch('http://127.0.0.1:4000/clientes')
      .then(response => response.json())
      .then(response => setItem(response))
      .catch(err => console.error(err));

  }, clientes);


  function HandleSave(c: cliente) {
    const newNome = (document.getElementById(`${c.id}-title`) as HTMLInputElement).value;
    const newTel = (document.getElementById(`${c.id}-telefone`) as HTMLInputElement).value;
    console.log(newTel);

    setEdit(false);

    const newData = {
      nome: newNome,
      telefone: newTel,
      endereco: c.endereco,
      id: c.id
    }

    fetch('http://127.0.0.1:4000/clientes',
      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(
        //TODO
      )
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
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            {useItem.map((c: cliente) =>
              <tr key={c.id}>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? c.nome : <input id={c.id + "-title"} type="text" defaultValue={c.nome} />}
                </td>
                <td className="font-quicksand py-2 m-1">
                  {!useEdit ? c.telefone : <input id={c.id + "-telefone"} type="text" defaultValue={c.telefone} />}
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
                  <button className="customButton" onClick={() => { }}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!useItem.length ? "Não há clientes Cadastrados" : <></>}
      </div>
    </section>
  )
};
