import { useEffect, useState } from "react";
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

interface TripleToggleSwitchProps {
  labels?: Labels;
}

export default function ThemeSwitcher({
  labels = {
    light: { title: "Light", value: "light" },
    dark: { title: "Dark", value: "dark" },
    gazzetta: { title: "Gazzetta", value: "gazzetta" },
  },
}: TripleToggleSwitchProps) {
  const initialTheme = localStorage.getItem("theme") || "light";
  const [selectedTheme, setselectedTheme] = useState<string>(initialTheme);
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

    const newAnimation = animations[selectedTheme + value] || null;

    setselectedTheme(value);
    setAnimation(newAnimation);
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "gazzetta");
    document.documentElement.classList.add(selectedTheme);
    localStorage.theme = selectedTheme;
  }, [selectedTheme]);

  const positionClass = {
    light: "left-position",
    dark: "center-position",
    gazzetta: "right-position",
  }[selectedTheme];

  return (
    <div className="relative w-[250px] h-[50px] border border-black dark:border-white rounded-full overflow-hidden">
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
          selectedTheme === "light" && "text-white"
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
          selectedTheme === "dark" && "text-black"
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
          selectedTheme === "gazzetta" && "text-white"
        }`}
        htmlFor="gazzetta"
      >
        <p className="font-bold">{labels.gazzetta.title}</p>
      </label>
    </div>
  );
}
