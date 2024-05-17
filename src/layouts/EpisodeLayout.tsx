import { Outlet, useParams } from "react-router-dom";
import { EpisodeList } from "../components/EpisodeList";

export const EpisodeLayout = () => {
  const { episodeId } = useParams();

  return (
    <section className="flex gap-x-8 w-full">
      <div className="w-1/2">
        <EpisodeList />
      </div>
      <div className="w-1/2">{episodeId && <Outlet />}</div>
    </section>
  );
};
