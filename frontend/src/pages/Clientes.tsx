import TableItem from "../components/global/TableItem";


const clientes = [
  {
    nome: "Raul",
    cpf: "38294798327",
    editar: "#",
    delete: "#",
    id: 1
  }
]




export default function Clientes() {
  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">Clientes</h1>
      <div className="content-container flex justify-center items-center overflow-scroll">
        <table className="w-full">
          <thead className="border-b-2 border-stone-500">
            <tr>
              <th className="font-quicksand text-left">Nome</th>
              <th className="font-quicksand text-left">CPF</th>
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
            <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
            <TableItem title="Teste com mais palavras" cpf="726351412" editar="#" delete="#" />
            <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
            <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
          </tbody>
        </table>
      </div>
    </section>
  )
};
