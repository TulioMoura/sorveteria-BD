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
      <div className="content-container flex justify-center items-center overflow-auto">
        <table className="w-full">
          <thead className="border-b-2 border-stone-500">
            <tr>
              <th className="font-quicksand text-left">Nome</th>
              <th className="font-quicksand text-left">CPF</th>
              <th className="font-quicksand"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-500 divide-dotted">
            <TableItem title="Teste" cpf="72635154122" editar="#" delete="#" />
            <TableItem title="Teste" cpf="72635145412" editar="#" delete="#" />
            <TableItem title="Teste com mais palavras" cpf="72635641412" editar="#" delete="#" />
            <TableItem title="Teste" cpf="72635155412" editar="#" delete="#" />
            <TableItem title="Teste" cpf="72635812412" editar="#" delete="#" />
          </tbody>
        </table>
      </div>
    </section>
  )
};
