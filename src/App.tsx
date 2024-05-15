import "./App.css";
import { FilmList } from "./components/FilmList";

function App() {
  return (
    <div className="p-10 w-screen flex flex-col">
      <section className="border-b border-1 border-gray-400 w-full p-4 mb-8 text-center">
        <h1 className="text-6xl pb-2">Tanstack Query</h1>
        <h2 className="text-3xl italic text-gray-600">
          one more project using Star Wars api
        </h2>
      </section>
      <FilmList />
    </div>
  );
}

export default App;
