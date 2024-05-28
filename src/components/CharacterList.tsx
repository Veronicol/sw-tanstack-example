import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { Character } from "../lib/models/character.model";
import { useCharacterList } from "./hooks/useCharacterList";
import { SwResponse } from "../lib/models/sw-response.model";

const fetchCharacters = async (
  page: number
): Promise<SwResponse<Character>> => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) {
    throw new Error("SW response was not OK");
  }
  return response.json();
};

export const CharacterList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [characterList, setCharacterList] = useState<Character[]>([]);

  const { currentPage, itemSelected, changeCurrentPage, selectItem } =
    useCharacterList();

  useEffect(() => {
    setIsLoading(true);

    fetchCharacters(currentPage || 0)
      .then((data) => {
        setCharacterList(data.results);
      })
      .catch((error) => {
        console.log("ERROR => ", error.error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

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
        <div className="flex flex-col">
          <div className="flex flex-col justify-start pl-4">
            {characterList.map((character) => (
              <button
                key={character.name}
                className={`border-b border-1 border-gray-400 w-full p-2 flex ${
                  itemSelected === character.name
                    ? "bg-slate-200"
                    : "bg-white hover:bg-slate-100"
                }`}
                onClick={() => {
                  selectItem(character.name);
                  const characterIndex = getIdxFromUrl(character.url);
                  navigate(`/character/${characterIndex}`);
                }}
              >
                <div className="font-semibold grow text-start">
                  {character.name}
                </div>
              </button>
            ))}
          </div>
          <div className="flex items-end justify-end gap-4 mt-4">
            <div className="text-sm text-gray-500">page {currentPage}</div>
            <button
              className={currentPage === 1 ? "text-gray-400" : ""}
              onClick={() => currentPage && changeCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              PREV
            </button>
            <button
              // className={isDisabled ? "text-gray-400" : ""}
              onClick={() => currentPage && changeCurrentPage(currentPage + 1)}
              // disabled={isDisabled}
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </>
  );
};
