import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getIdxFromUrl } from "../utils/getIdxFromUrl";
import { Character } from "../lib/models/character.model";
import { useCharacterList } from "./hooks/useCharacterList";
import { SwResponse } from "../lib/models/sw-response.model";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCharacters = async (
  pageParam: string
): Promise<SwResponse<Character>> => {
  const response = await fetch(pageParam);
  if (!response.ok) {
    throw new Error("SW response was not OK");
  }
  return response.json();
};

export const CharacterList = () => {
  const navigate = useNavigate();
  const characterListContainer = useRef<HTMLDivElement>(null);

  const { currentPage, itemSelected, changeCurrentPage, selectItem } =
    useCharacterList();

  const charactersQueryResult = useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: ({ pageParam }) => fetchCharacters(pageParam),
    initialPageParam: "https://swapi.dev/api/people/?page=1",
    staleTime: 24 * 60 * 60 * 1000, // one day - stablish per default
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const { data, isFetching, isError, hasNextPage, fetchNextPage } =
    charactersQueryResult;

  useEffect(() => {
    if (characterListContainer.current) {
      characterListContainer.current.scrollTop =
        characterListContainer.current.scrollHeight;
    }
  }, [data?.pages]);

  return (
    <>
      {isFetching ? (
        <div className="flex items-center justify-center h-80">
          <span className="loader"></span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-20 text-2xl">
          Ooops... something went wrong
        </div>
      ) : (
        <div className="flex flex-col">
          <div
            ref={characterListContainer}
            className="flex flex-col justify-start pl-4 h-[410px] overflow-scroll"
          >
            {data?.pages.map((page, idx) => (
              <Fragment key={idx}>
                {page.results.map((character) => (
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
              </Fragment>
            ))}
          </div>
          <div className="flex items-end justify-end gap-4 mt-4">
            <button
              className={
                data?.pages.length === currentPage && !hasNextPage
                  ? "text-gray-400"
                  : ""
              }
              onClick={() => {
                data?.pages.length === currentPage && fetchNextPage();
                changeCurrentPage(currentPage + 1);
              }}
              disabled={data?.pages.length === currentPage && !hasNextPage}
            >
              LOAD MORE...
            </button>
          </div>
        </div>
      )}
    </>
  );
};
