import { useState } from "react"


interface listItemProps {
  title: string,
  cpf?: string,
  editar?: string,
  delete?: string
}

function HandleDelete(){
  return 
}

export default function TableItem(props: listItemProps) {

  const [toEdit, setToEdit] = useState(false);
  const [toDelete, setDelete] = useState(false);

  

  return (
    <tr>
      <td className="font-quicksand py-2 m-1">
        {!toEdit ? props.title : <input type="text" value={props.title} />}
      </td>
      <td className="font-quicksand py-2 m-1">
        {!toEdit ? props.cpf : <input type="text" value={props.cpf} />}
      </td>
      <td className="flex justify-end">
        <button className="customButton" onClick={() => setToEdit(true)} >Editar</button>
        <button className="customButton" onClick={HandleDelete} >Delete</button>
      </td>
    </tr>
  )
};
