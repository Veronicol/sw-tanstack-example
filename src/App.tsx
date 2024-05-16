import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

enum Section {
  EPISODES = "episode",
  CHARACTERS = "character",
}

const sectionOptions = [
  { label: "Episodes", section: Section.EPISODES },
  { label: "Characters", section: Section.CHARACTERS },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState<Section>(
    Section.EPISODES
  );

  useEffect(() => {
    location.pathname === "/" && navigate("/episode");
  }, [location]);

  return (
    <div className="p-10 w-screen flex flex-col">
      <section className="border-b border-1 border-gray-400 w-full p-4 mb-8 text-center">
        <h1 className="text-6xl pb-2">Tanstack Query</h1>
        <h2 className="text-3xl italic text-gray-600">
          a(nother) project using Star Wars api
        </h2>
      </section>
      <section className="px-4 flex gap-20">
        {sectionOptions.map((option) => {
          const isSelected = option.section === currentSection;
          return (
            <button
              key={option.section}
              className={`text-3xl pb-4 ${
                isSelected ? "font-semibold" : "text-gray-400"
              }`}
              onClick={() => {
                setCurrentSection(option.section);
                navigate(`/${option.section}`);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </section>
      <Outlet />
    </div>
  );
}

export default App;
