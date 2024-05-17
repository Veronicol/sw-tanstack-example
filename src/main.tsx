import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { EpisodeLayout } from "./layouts/EpisodeLayout.tsx";
import { EpisodeDetail } from "./components/EpisodeDetail.tsx";
import { CharacterDetail } from "./components/CharacterDetail.tsx";
import { CharacterLayout } from "./layouts/CharacterLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "episode",
        element: <EpisodeLayout />,
        children: [
          {
            path: ":episodeId",
            element: <EpisodeDetail />,
          },
        ],
      },
      {
        path: "character",
        element: <CharacterLayout />,
        children: [
          {
            path: ":characterId",
            element: <CharacterDetail />,
          },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
