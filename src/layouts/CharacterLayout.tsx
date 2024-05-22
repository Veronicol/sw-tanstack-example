import { Outlet, useParams } from "react-router-dom";
import { CharacterList } from "../components/CharacterList";

export const CharacterLayout = () => {
  const { characterIdx } = useParams();

  return (
    <section className="flex gap-x-8 w-full">
      <div className="w-1/2">
        <CharacterList />
      </div>
      <div className="w-1/2">{characterIdx && <Outlet />}</div>
    </section>
  );
};
