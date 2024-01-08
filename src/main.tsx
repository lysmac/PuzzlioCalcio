import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import TailwindColors from "./pages/TailwindColors.tsx";
import Test from "./pages/Test.tsx";
import PlayerProvider from "./PlayerContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/test", element: <Test /> },
  { path: "/tailwind", element: <TailwindColors /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <PlayerProvider>
    <RouterProvider router={router} />
  </PlayerProvider>
  // </React.StrictMode>
);
