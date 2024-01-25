import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import PlayerProvider from "./PlayerContext.tsx";
import ThemeProvider from "./ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeProvider>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
