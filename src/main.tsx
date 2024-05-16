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
import { CharacterList } from "./components/CharacterList.tsx";
import { EpisodeDetail } from "./components/EpisodeDetail.tsx";

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
            path: ":id",
            element: <EpisodeDetail />,
          },
        ],
      },
      { path: "character", element: <CharacterList /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
