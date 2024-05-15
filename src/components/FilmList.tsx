import { useEffect, useState } from "react";
import { Film } from "../lib/models";

export const FilmList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [filmList, setFilmList] = useState<Film[]>([]);

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
    <section className="px-4">
      <h3 className="text-3xl pb-4">Episodes</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : isApiError ? (
        <div>Ooops... something went wrong</div>
      ) : (
        <div className="flex flex-col justify-start pl-4 w-3/5">
          {filmList.map((film) => (
            <div
              key={film.episode_id}
              className="border-b border-1 border-gray-400 w-full p-2 flex"
            >
              <div className="font-semibold grow">
                {`0${film.episode_id} _ ${film.title}`}
              </div>
              <div className="italic w-30">
                {film.director}, {film.release_date.split("-")[0]}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
