interface listItemProps {
  title: string,
  cpf?:string,
  editar?: string,
  delete?: string
}

export default function TableItem(props: listItemProps) {
  return (
    <tr>
      <td className="font-quicksand py-2 m-1">{props.title}</td>
      <td className="font-quicksand py-2 m-1">{props.cpf}</td>
      <td>
        {props.editar && <a className="customButton" href={props.editar}>Editar</a>}
        {props.delete && <a className="customButton" href={props.delete}>Deletar</a>}
      </td>
    </tr>
  )
};
