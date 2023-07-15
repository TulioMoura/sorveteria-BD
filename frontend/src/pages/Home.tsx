import Card from "../components/global/Card";

export default function Home() {
  return (
    <>
      <section className="container-fluid header bg-rv-pale h-screen ">
        <div className="content-container h-full flex justify-center items-center">
          <p className="font-black"></p>
          <Card
            img="https://img.freepik.com/free-vector/ice-cream-cone-cartoon-icon-illustration-sweet-food-icon-concept-isolated-flat-cartoon-style_138676-2924.jpg?w=360"
            title="Sorveteria"
            href="#"
          />
        </div>
      </section>
    </>
  );
}
