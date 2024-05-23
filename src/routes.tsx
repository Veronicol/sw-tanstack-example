import { EpisodeLayout } from "./layouts/EpisodeLayout.tsx";
import { EpisodeDetail } from "./components/EpisodeDetail.tsx";
import { CharacterDetail } from "./components/CharacterDetail.tsx";
import { CharacterLayout } from "./layouts/CharacterLayout.tsx";

import { Navigate } from "react-router-dom";

import App from "./App.tsx";

export const appRoutes = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "episode",
        element: <EpisodeLayout />,
        children: [
          {
            path: ":episodeIdx",
            element: <EpisodeDetail />,
          },
        ],
      },
      {
        path: "character",
        element: <CharacterLayout />,
        children: [
          {
            path: ":characterIdx",
            element: <CharacterDetail />,
          },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];
