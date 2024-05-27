import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../lib/models";
import { Character } from "../lib/models/character.model";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

// const fetchEpisode = async (idx: string): Promise<Film>  => {
//   const response = await fetch(`https://swapi.dev/api/films/${idx}`);
//   if (!response.ok) {
//     throw new Error('SW response was not OK');
//   }
//   return response.json();
// }

const fetchEpisode = async ({queryKey}: QueryFunctionContext): Promise<Film>  => {
  const [_episodeKey, episodeIdx]  = queryKey;
  const response = await fetch(`https://swapi.dev/api/films/${episodeIdx}`);
  if (!response.ok) {
    throw new Error('SW response was not OK');
  }
  return response.json();
}

const fetchCharacter = async (idx: string): Promise<Character> => {
  const response = await fetch(`https://swapi.dev/api/people/${idx}`);
  if (!response.ok) {
    throw new Error('SW response was not OK');
  }
  return response.json();
}

export const EpisodeDetail = () => {
  const { episodeIdx } = useParams();
  const navigate = useNavigate();

  const [episodeCharacters, setEpisodeCharacters] = useState<Character[]>();

  const queryResult = useQuery({
    queryKey: ['episode', episodeIdx],
    // aquí tenemos dos opciones: coger la queryKey del contexto que se le pasa, o arrow fn
    // queryFn: () => fetchEpisode(episodeIdx)
    queryFn: fetchEpisode
  })

  const { data, isLoading, isError} = queryResult;
  const episodeDetail = data;


  useEffect(() => {
    if (episodeDetail?.characters) {
      Promise.all(
        episodeDetail.characters.map((character) => {
          const characterIdx = getIdxFromUrl(character);
          return fetchCharacter(characterIdx)
        })
      )
        .then((dataList) => setEpisodeCharacters(dataList))
        .catch((error) => {
          console.log("ERROR => ", error.error);
        })
        // .finally(() => setIsLoading(false));
    }
  }, [episodeDetail]);

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
        <div className="flex flex-col justify-start p-4 border border-gray-400 border-1 rounded-xl">
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
