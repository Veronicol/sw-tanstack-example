import { useEffect, useState } from "react";
import { Film } from "../lib/models";
import { useNavigate } from "react-router-dom";

export const EpisodeList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [filmList, setFilmList] = useState<Film[]>([]);
  const [itemSelected, setItemSelected] = useState<number>();

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((res) => res.json())
      .then((data) => {
        setFilmList(data.results);
      })
      .catch((error) => {
        console.log("ERROR => ", error.error);
        setIsApiError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-1/2 h-80 flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : isApiError ? (
        <div className="text-2xl w-1/2 h-20 flex justify-center items-center">
          Ooops... something went wrong
        </div>
      ) : (
        <div className="flex flex-col justify-start pl-4 w-1/2">
          {filmList.map((film) => (
            <button
              key={film.episode_id}
              className={`border-b border-1 border-gray-400 w-full p-2 flex ${
                itemSelected === film.episode_id
                  ? "bg-slate-200"
                  : "bg-white hover:bg-slate-100"
              }`}
              onClick={() => {
                setItemSelected(film.episode_id);
                navigate(`/episode/${film.episode_id}`);
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
