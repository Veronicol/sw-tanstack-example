import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../lib/models";
import { Character } from "../lib/models/character.model";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";

export const EpisodeDetail = () => {
  const { episodeIdx } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [episodeDetail, setEpisodeDetail] = useState<Film>();
  const [episodeCharacters, setEpisodeCharacters] = useState<Character[]>();

  useEffect(() => {
    if (episodeIdx) {
      setIsLoading(true);
      fetch(`https://swapi.dev/api/films/${episodeIdx}`)
        .then((res) => res.json())
        .then((data) => {
          setEpisodeDetail(data);
        })
        .catch((error) => {
          console.log("ERROR => ", error.error);
          setIsApiError(true);
        });
    }
  }, [episodeIdx]);

  useEffect(() => {
    if (episodeDetail?.characters) {
      Promise.all(
        episodeDetail.characters.map((character) => {
          const characterIdx = getIdxFromUrl(character);
          return fetch(`https://swapi.dev/api/people/${characterIdx}`).then(
            (res) => res.json()
          );
        })
      )
        .then((dataList) => setEpisodeCharacters(dataList))
        .catch((error) => {
          console.log("ERROR => ", error.error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [episodeDetail]);

  return (
    <>
      {isLoading ? (
        <div className="h-80 flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : isApiError ? (
        <div className="text-2xl h-20 flex justify-center items-center">
          Ooops... something went wrong
        </div>
      ) : (
        <div className="flex flex-col justify-start p-4 border border-1 rounded-xl border-gray-400">
          <div className="text-2xl font-semibold">{episodeDetail?.title}</div>
          <div className="m-2">
            <div>
              Year:
              <span className="font-semibold">
                {" "}
                {episodeDetail?.release_date.split("-")[0]}
              </span>
            </div>
            <div>
              Director:
              <span className="font-semibold"> {episodeDetail?.director}</span>
            </div>
            <div>
              Producer:
              <span className="font-semibold"> {episodeDetail?.producer}</span>
            </div>
            <div className="mt-4 italic">{episodeDetail?.opening_crawl}</div>
          </div>
          {episodeCharacters && (
            <div className="mx-2">
              <div className="font-semibold">Characters:</div>
              <ul className="mx-4">
                {episodeCharacters.map((character) => (
                  <li className="mt-2 hover:font-semibold" key={character.name}>
                    <button
                      onClick={() => {
                        const characterIdx = getIdxFromUrl(character.url);
                        navigate(`/character/${characterIdx}`);
                      }}
                    >
                      {character.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};
