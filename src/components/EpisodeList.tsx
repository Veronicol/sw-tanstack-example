import { useEffect, useState } from "react";
import { Film } from "../lib/models";
import { useNavigate } from "react-router-dom";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { getEpisodeFromIdx } from "../utils/getEpisodeFromIdx";
import { SwResponse } from "../lib/models/sw-response.model";
import { useQuery } from "@tanstack/react-query";

const fetchEpisodes = async (): Promise<SwResponse<Film>> => {
  const response = await fetch("https://swapi.dev/api/films");
  if (!response.ok) {
    throw new Error('SW response was not OK');
  }
  return response.json();
}

export const EpisodeList = ({ episodeIdx }: { episodeIdx?: string }) => {
  const navigate = useNavigate();
  const [itemSelected, setItemSelected] = useState<number>();

  const queryResult = useQuery({
    queryKey: ["episodes"],
    queryFn: fetchEpisodes,
    // refetchOnWindowFocus: false,
    staleTime: 3000,
    gcTime: 6000
  });

  const { data, isLoading, isError } = queryResult;
  const episodeList: Film[] = data?.results || [];
  //const episodeList: Film[] = useMemo(() => data?.results || [], [data]);

  useEffect(() => {
    if (episodeIdx) {
      const episode = getEpisodeFromIdx(episodeList, episodeIdx);
      episode && setItemSelected(episode.episode_id);
    }
  }, [episodeIdx, episodeList]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-80">
          <span className="loader"></span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-20 text-2xl">
          Ooops... something went wrong
        </div>
      ) : (
        <div className="flex flex-col justify-start pl-4">
          {episodeList.map((film) => (
            <button
              key={film.episode_id}
              className={`border-b border-1 border-gray-400 w-full p-2 flex ${
                itemSelected === film.episode_id
                  ? "bg-slate-200"
                  : "bg-white hover:bg-slate-100"
              }`}
              onClick={() => {
                setItemSelected(film.episode_id);
                const episodeIndex = getIdxFromUrl(film.url);
                navigate(`/episode/${episodeIndex}`);
              }}
            >
              <div className="font-semibold grow text-start">
                {`0${film.episode_id} _ ${film.title}`}
              </div>
              <div className="italic w-30">
                {film.director}, {film.release_date.split("-")[0]}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
