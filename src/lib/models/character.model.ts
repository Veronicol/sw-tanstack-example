import { Film } from "./film.model";
import { Species } from "./species.model";
import { Starship } from "./starship.model";
import { Vehicle } from "./vehicle.model";

export type Character = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: Film[];
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
  url: string;
  created: string;
  edited: string;
};
