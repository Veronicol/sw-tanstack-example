import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { Character } from "../lib/models/character.model";

export const CharacterList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [itemSelected, setItemSelected] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data.results[0]);
        setCharacterList(data.results);
        !totalPages && setTotalPages(Math.ceil(data.count / 10));
      })
      .catch((error) => {
        console.log("ERROR => ", error.error);
        setIsApiError(true);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

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
                  setItemSelected(character.name);
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
          <div className="mt-4 flex justify-end gap-4 items-end">
            <div className="text-gray-500 text-sm">
              page {currentPage} of {totalPages}
            </div>
            <button
              className={currentPage === 1 ? "text-gray-400" : ""}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              PREV
            </button>
            <button
              className={currentPage === totalPages ? "text-gray-400" : ""}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </>
  );
};
