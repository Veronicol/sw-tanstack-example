import { Character } from "./character.model";
import { Film } from "./film.model";

export type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: Character[];
  films: Film[];
  url: string;
  created: string;
  edited: string;
};
