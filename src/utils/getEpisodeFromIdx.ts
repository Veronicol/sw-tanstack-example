import { Film } from "../lib/models";

export const getEpisodeFromIdx = (episodes: Film[], idx: string) => {
  return episodes.find((episode) => {
    const { url } = episode;
    const splittedUrl = url.split("/");
    return splittedUrl[splittedUrl.length - 2] === idx;
  });
};
