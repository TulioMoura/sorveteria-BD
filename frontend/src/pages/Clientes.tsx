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
      <div className="content-container flex justify-center items-center">
        <table className="w-full divide-y divide-stone-500 divide-dotted">
          <tr>
            <th className="font-quicksand text-left">Nome</th>
            <th className="font-quicksand text-left">CPF</th>
            <th className="font-quicksand text-left">Opções</th>
          </tr>
          <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
          <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
          <TableItem title="Teste com mais palavras" cpf="726351412" editar="#" delete="#" />
          <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
          <TableItem title="Teste" cpf="726351412" editar="#" delete="#" />
        </table>
      </div>
    </section>
  )
};
