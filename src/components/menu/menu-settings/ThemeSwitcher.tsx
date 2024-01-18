import { useContext, useState } from "react";
import { Theme, ThemeContext } from "../../../ThemeContext";
import "./ThemeSwitcher.css";

interface ThemeLabel {
  title: string;
  value: string | number | boolean;
}

interface ThemeLabels {
  light: ThemeLabel;
  dark: ThemeLabel;
  gazzetta: ThemeLabel;
}

interface ThemeSwitcherProps {
  labels?: ThemeLabels;
}

export default function ThemeSwitcher({
  labels = {
    light: { title: "Light", value: "light" },
    dark: { title: "Dark", value: "dark" },
    gazzetta: { title: "Gazzetta", value: "gazzetta" },
  },
}: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [animation, setAnimation] = useState<string | null>(null);

  const getSwitchAnimation = (value: string) => {
    const animations: { [key: string]: string | undefined } = {
      lightDark: "left-to-center",
      darkGazzetta: "center-to-right",
      gazzettaDark: "right-to-center",
      darkLight: "center-to-left",
      gazzettaLight: "right-to-left",
      lightGazzetta: "left-to-right",
    };
  
    console.log("value:", value);
    console.log("theme:", theme);
  
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    const newAnimation = animations[theme + capitalizedValue] || null;
  
    console.log("newAnimation:", newAnimation);
  
    setAnimation(newAnimation);
    toggleTheme(value as Theme);
  };
  

  const positionClass = {
    light: "left-position",
    dark: "center-position",
    gazzetta: "right-position",
  }[theme];

  return (
    <div className="relative w-[250px] h-[50px] border border-primary-contrast rounded-full overflow-hidden">
      <div className={`switch ${animation} ${positionClass}`}></div>
      <input
        onChange={(e) => getSwitchAnimation(e.target.value)}
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
        onChange={(e) => getSwitchAnimation(e.target.value)}
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
        onChange={(e) => getSwitchAnimation(e.target.value)}
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
