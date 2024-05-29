import { useEffect, useState } from "react";
import { Film } from "../lib/models";
import { useNavigate } from "react-router-dom";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { getEpisodeFromIdx } from "../utils/getEpisodeFromIdx";
import { SwResponse } from "../lib/models/sw-response.model";
import episodeVII from "./../utils/episodeVII.json";

const fetchEpisodes = async (): Promise<SwResponse<Film>> => {
  const response = await fetch("https://swapi.dev/api/films");
  if (!response.ok) {
    throw new Error("SW response was not OK");
  }
  return response.json();
};

const addEpisode = async () => {
  return new Promise(function (resolve, _reject) {
    setTimeout(() => {
      resolve(episodeVII);
    }, 500);
  });
};

export const EpisodeList = ({ episodeIdx }: { episodeIdx?: string }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [episodeList, setEpisodeList] = useState<Film[]>([]);
  const [itemSelected, setItemSelected] = useState<number>();

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
        setIsError(true);
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
      ) : isError ? (
        <div className="flex items-center justify-center h-20 text-2xl">
          Ooops... something went wrong
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-end">
          <div className="flex flex-col justify-start pl-4 w-full">
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
          <button
            className={`mr-4 border border-1 border-gray-400 py-1 px-3 rounded-md ${
              episodeList.length === 7
                ? "text-gray-400"
                : "bg-slate-100 hover:bg-slate-200"
            } `}
            // onClick={() => postEpisode()}
            disabled={episodeList.length === 7}
          >
            Add episode VII
          </button>
        </div>
      )}
    </>
  );
};
