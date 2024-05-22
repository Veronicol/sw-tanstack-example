import { Outlet, useParams } from "react-router-dom";
import { EpisodeList } from "../components/EpisodeList";

export const EpisodeLayout = () => {
  const { episodeIdx } = useParams();

  return (
    <section className="flex gap-x-8 w-full">
      <div className="w-1/2">
        <EpisodeList episodeIdx={episodeIdx} />
      </div>
      <div className="w-1/2">{episodeIdx && <Outlet />}</div>
    </section>
  );
};
