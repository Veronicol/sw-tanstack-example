import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Film } from "../lib/models";

export const EpisodeDetail = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [episodeDetail, setEpisodeDetail] = useState<Film>();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`https://swapi.dev/api/films/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("RESULT => ", data);
          setEpisodeDetail(data);
        })
        .catch((error) => {
          console.log("ERROR => ", error.error);
          setIsApiError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

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
          {episodeDetail?.title}
        </div>
      )}
    </>
  );
};
