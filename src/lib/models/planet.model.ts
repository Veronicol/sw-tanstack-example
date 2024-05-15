import { Character } from "./character.model";
import { Film } from "./film.model";

export type Planet = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: Character[];
  films: Film[];
  url: string;
  created: string;
  edited: string;
};
