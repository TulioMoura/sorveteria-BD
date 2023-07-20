import { useEffect, useState } from "react";

interface Pedido {
  id: string,
  idCliente: string,
  itens: [],
}

export default function Pedidos() {


  let pedidos: Pedido[] = [];

  const [useItem, setItem] = useState(pedidos);
  const [useEdit, setEdit] = useState(false);

  let counter = 0;

  useEffect(() => {

    fetch('http://localhost:4000/pedidos')
      .then(response => response.json())
      .then(response => setItem(response))
      .catch(err => console.error(err));

  }, pedidos);







  return (
    <section className="container-fluid header bg-rv-pale min-h-screen ">
      <h1 className="font-black font-DancingScript text-3xl text-center p-5">Pedidos</h1>
      <div className="content-container flex justify-center items-center overflow-auto">

        <ul className="w-full divide-y divide-stone-500 divide-dotted">
          {useItem.map((p: Pedido) =>
            <li key={p.id} className="w-full flex justify-between">
              <span>Pedido n° {++counter}</span>

              <div>
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
              </div>

            </li>
          )}
          <li>
            <td className="flex justify-end">
              <button className="customButton" onClick={async () => {
                const created = await HandleCreate(useNovoPedidos);
                if (created) {
                  setNovoPedidos({ tipo: "", sabor: "", preco: "", lucro: null })
                  let inputTipo = (document.getElementById(`TipoPedidos`) as HTMLInputElement);
                  let inputSabor = (document.getElementById(`SaborPedidos`) as HTMLInputElement);
                  let inputPreco = (document.getElementById(`PrecoPedidos`) as HTMLInputElement);
                  let inputLucro = (document.getElementById(`LucroPedidos`) as HTMLInputElement);
                  inputTipo.value = "";
                  inputSabor.value = "";
                  inputPreco.value = "";
                  inputLucro.value = "";
                }
              }}>
                Criar!
              </button>
            </td>
          </li>
        </ul>
      </div>
      {!useItem.length ? <p className="font-quicksand text-xl text-center my-3">Não há Pedidos cadastrados </p> : <></>}
    </section>
  )
};
