import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../lib/models/character.model";
import { Planet } from "../lib/models/planet.model";

const fetchCharacter = async (idx: string): Promise<Character> => {
  const response = await fetch(`https://swapi.dev/api/people/${idx}`);
  if (!response.ok) {
    throw new Error('SW response was not OK');
  }
  return response.json();
}

export const CharacterDetail = () => {
  const { characterIdx } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [characterDetail, setCharacterDetail] = useState<Character>();
  const [characterData, setCharacterData] = useState<Planet>();

  useEffect(() => {
    if (characterIdx) {
      setIsLoading(true);

      fetchCharacter(characterIdx)
        .then((data) => {
          setCharacterDetail(data);
        })
        .catch((error) => {
          console.log("ERROR => ", error.error);
          setIsError(true);
        });
    }
  }, [characterIdx]);

  useEffect(() => {
    if (characterDetail) {
      const { homeworld } = characterDetail;

      const fetchHomeworld = () => {
        return fetch(homeworld).then((res) => res.json());
      };

      Promise.all([fetchHomeworld()])
        .then((dataList) => {
          setCharacterData(dataList[0]);
        })
        .catch((error) => {
          console.log("ERROR => ", error.error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [characterDetail]);

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
          <div className="text-2xl font-semibold">{characterDetail?.name}</div>
          <div className="m-2 ml-6">
            <div className="mb-2">
              Gender:
              <span className="font-semibold"> {characterDetail?.gender}</span>
            </div>
            <div className="mb-2">
              Birth year:
              <span className="font-semibold">
                {" "}
                {characterDetail?.birth_year || "-"}
              </span>
            </div>
            <div className="mb-2">
              Eye color:
              <span className="font-semibold">
                {" "}
                {characterDetail?.eye_color || "-"}
              </span>
            </div>
            <div className="mb-2">
              Hair color:
              <span className="font-semibold">
                {" "}
                {characterDetail?.hair_color || "-"}
              </span>
            </div>
            <div className="mb-2">
              Height:
              <span className="font-semibold">
                {" "}
                {characterDetail?.height || "-"} cm
              </span>
            </div>
            <div className="mb-2">
              Mass:
              <span className="font-semibold">
                {" "}
                {characterDetail?.mass || "-"} kg
              </span>
            </div>
            <div className="mb-2">
              Home World:
              <span className="font-semibold">
                {" "}
                {characterData?.name || "-"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
