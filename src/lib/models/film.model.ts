import { Character } from "./character.model";
import { Planet } from "./planet.model";
import { Species } from "./species.model";
import { Starship } from "./starship.model";
import { Vehicle } from "./vehicle.model";

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
  characters: Character[];
  planets: Planet[];
  url: string;
  created: string;
  edited: string;
};
