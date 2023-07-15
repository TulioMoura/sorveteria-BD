interface cardProps{
  img: string,
  title: string,
  href?: string
}

export default function Card(props: cardProps) {
  return (
    <div className=" flex flex-col w-48 bg-rv-primary hover:bg-rv-pale-dark border-b-4 border-stone-700 min-h-[33%] rounded">
      <a href={props.href} className="w-full p-2 text-stone-700 font-bold">
        <figure className="w-full">
          <img className="w-full" src={props.img} alt="" />
        </figure>
        <h2>{props.title}</h2>
      </a>
    </div>
  );
}
