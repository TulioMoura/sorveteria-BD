import { useState } from "react";

interface listItemProps {
  title: string;
  id: string;
  tel?: string;
  endereco?: string;
  delete?: string;
}

export default function TableItem(props: listItemProps) {

  const [toEdit, setToEdit] = useState(false);


  return (
    <tr>
      <td className="font-quicksand py-2 m-1">
        {!toEdit ? props.title : <input id={props.id + "-title"} type="text" placeholder={props.title} />}
      </td>
      <td className="font-quicksand py-2 m-1">
        {!toEdit ? props.tel : <input id={props.id + "-telefone"} type="text" placeholder={props.tel} />}
      </td>
      <td className="flex justify-end">

        {toEdit ? (
          <button className="customButton">
            Salvar
          </button>
        ) : (
          <button className="customButton" onClick={() => setToEdit(true)}>
            Editar
          </button>
        )}

        <button className="customButton">
          Delete
        </button>
      </td>
    </tr>
  );
}
