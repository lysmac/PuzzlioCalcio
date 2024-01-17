import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import "./ThemeSwitcher.css";

interface Label {
  title: string;
  value: string | number | boolean;
}

interface Labels {
  light: Label;
  dark: Label;
  gazzetta: Label;
}

interface ThemeSwitcherProps {
  labels?: Labels;
}

export default function ThemeSwitcher({
  labels = {
    light: { title: "Light", value: "light" },
    dark: { title: "Dark", value: "dark" },
    gazzetta: { title: "Gazzetta", value: "gazzetta" },
  },
}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const getSwitchAnimation = (value: string) => {
    toggleTheme();

    const animations: { [key: string]: string | undefined } = {
      lightDark: "left-to-center",
      darkGazzetta: "center-to-right",
      gazzettaDark: "right-to-center",
      darkLight: "center-to-left",
      gazzettaLight: "right-to-left",
      lightGazzetta: "left-to-right",
    };

    const newAnimation = animations[theme + value] || null;

    return newAnimation;
  };

  const positionClass = {
    light: "left-position",
    dark: "center-position",
    gazzetta: "right-position",
  }[theme];

  return (
    <div className="relative w-[250px] h-[50px] border border-black dark:border-white rounded-full overflow-hidden">
      <div
        className={`switch ${getSwitchAnimation(theme)} ${positionClass}`}
      ></div>
      <input
        onChange={() => toggleTheme()}
        name="map-switch"
        id="light"
        type="radio"
        className="hidden"
        value="light"
      />
      <label
        className={`absolute cursor-pointer z-10 ${
          theme === "light" && "text-white"
        }`}
        htmlFor="light"
      >
        <p className="font-bold">{labels.light.title}</p>
      </label>

      <input
        onChange={() => toggleTheme()}
        name="map-switch"
        id="dark"
        type="radio"
        className="hidden"
        value="dark"
      />
      <label
        className={`absolute left-[85px] cursor-pointer z-10 ${
          theme === "dark" && "text-black"
        }`}
        htmlFor="dark"
      >
        <p className="font-bold">{labels.dark.title}</p>
      </label>

      <input
        onChange={() => toggleTheme()}
        name="map-switch"
        id="gazzetta"
        type="radio"
        className="hidden"
        value="gazzetta"
      />
      <label
        className={`absolute right-[2px] cursor-pointer z-10 ${
          theme === "gazzetta" && "text-white"
        }`}
        htmlFor="gazzetta"
      >
        <p className="font-bold">{labels.gazzetta.title}</p>
      </label>
    </div>
  );
}
