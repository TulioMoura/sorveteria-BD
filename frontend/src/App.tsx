import Navbar from "./components/global/Navbar";
import AppRouter from "./Routes";

export default function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <AppRouter />
      </div>
    </>
  );
}
