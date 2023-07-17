import TableItem from "../components/global/TableItem";
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
  
  useEffect(() => {
    
    fetch('http://127.0.0.1:4000/clientes')
    .then(response => response.json())
    .then(response => setItem(response))
    .catch(err => console.error(err));
    
  }, clientes);

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
            {useItem.map((c: cliente) => <TableItem title={c.nome} cpf={c.telefone} key={c.id} id={c.id} />)}
            {!useItem.length ? "Não há clientes Cadastrados" : <></>}
          </tbody>
        </table>
      </div>
    </section>
  )
};
