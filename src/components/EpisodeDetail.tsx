import { useNavigate, useParams } from "react-router-dom";
import { Film } from "../lib/models";
import { Character } from "../lib/models/character.model";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import {
  QueryFunctionContext,
  useQueries,
  useQuery,
} from "@tanstack/react-query";

// const fetchEpisode = async (idx: string): Promise<Film>  => {
//   const response = await fetch(`https://swapi.dev/api/films/${idx}`);
//   if (!response.ok) {
//     throw new Error('SW response was not OK');
//   }
//   return response.json();
// }

const fetchEpisode = async ({
  queryKey,
}: QueryFunctionContext): Promise<Film> => {
  const [_episodeKey, episodeIdx] = queryKey;
  const response = await fetch(`https://swapi.dev/api/films/${episodeIdx}`);
  if (!response.ok) {
    throw new Error("SW response was not OK");
  }
  return response.json();
};

const fetchCharacter = async (idx: string): Promise<Character> => {
  const response = await fetch(`https://swapi.dev/api/people/${idx}`);
  if (!response.ok) {
    throw new Error("SW response was not OK");
  }
  return response.json();
};

export const EpisodeDetail = () => {
  const { episodeIdx } = useParams();
  const navigate = useNavigate();

  const episodeQueryResult = useQuery({
    queryKey: ["episode", episodeIdx],
    // aquí tenemos dos opciones: coger la queryKey del contexto que se le pasa, o arrow fn
    // queryFn: () => fetchEpisode(episodeIdx || '')
    // enabled: !!episodeIdx
    queryFn: fetchEpisode,
  });

  const {
    data: episodeData,
    isLoading: isEpisodeLoading,
    isError: isEpisodeError,
  } = episodeQueryResult;
  const episodeDetail = episodeData;

  const charactersQueryResult = useQueries({
    queries: episodeDetail?.characters
      ? episodeDetail.characters.map((characterUrl) => {
          const characterIdx = getIdxFromUrl(characterUrl);
          return {
            queryKey: ["character", characterIdx],
            queryFn: () => fetchCharacter(characterIdx),
          };
        })
      : [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data) as Character[],
        loading: results.some((result) => result.isLoading),
        error: results.some((result) => result.isError),
      };
    },
  });

  const {
    data: charactersData,
    loading: isCharactersLoading,
    error: isCharactersError,
  } = charactersQueryResult;
  const episodeCharacters = charactersData;

  return (
    <>
      {isEpisodeLoading || isCharactersLoading ? (
        <div className="flex items-center justify-center h-80">
          <span className="loader"></span>
        </div>
      ) : isEpisodeError || isCharactersError ? (
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
