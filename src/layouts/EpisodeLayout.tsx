import { Outlet, useParams } from "react-router-dom";
import { EpisodeList } from "../components/EpisodeList";

export const EpisodeLayout = () => {
  const { id } = useParams();

  return (
    <section className="flex gap-x-8 w-full">
      <EpisodeList />
      {id && <Outlet />}
    </section>
  );
};
