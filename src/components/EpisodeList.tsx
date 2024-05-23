import { useEffect, useState } from "react";
import { Film } from "../lib/models";
import { useNavigate } from "react-router-dom";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { getEpisodeFromIdx } from "../utils/getEpisodeFromIdx";
import { SwResponse } from "../lib/models/sw-response.model";

export const EpisodeList = ({ episodeIdx }: { episodeIdx?: string }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [episodeList, setEpisodeList] = useState<Film[]>([]);
  const [itemSelected, setItemSelected] = useState<number>();

  const fetchEpisodes = (): Promise<SwResponse<Film>> =>
    fetch("https://swapi.dev/api/films").then((res) => res.json());

  useEffect(() => {
    fetchEpisodes()
      .then((data) => {
        const sortedResults = data.results.sort(
          (a, b) => a.episode_id - b.episode_id
        );
        setEpisodeList(sortedResults);
      })
      .catch((error) => {
        console.log("ERROR => ", error.error);
        setIsApiError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
      ) : isApiError ? (
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
