// ThemeSwitcher.tsx
import { useEffect, useState } from "react";
import "./ThemeSwitcher.css";

interface Label {
  title: string;
  value: string | number | boolean;
}

interface Labels {
  left: Label;
  center: Label;
  right: Label;
}

interface TripleToggleSwitchProps {
  labels?: Labels;
  onChange: (value: string | number | boolean) => void;
}

export default function ThemeSwitcher({
  labels = {
    left: { title: "Light", value: "left" },
    center: { title: "Dark", value: "center" },
    right: { title: "Gazzetta", value: "right" },
  },
  onChange,
}: TripleToggleSwitchProps) {
  const [switchPosition, setSwitchPosition] = useState<string>("left");
  const [animation, setAnimation] = useState<string | null>(null);

  const getSwitchAnimation = (value: string) => {
    const animations: { [key: string]: string | undefined } = {
      centerleft: "left-to-center",
      rightcenter: "center-to-right",
      centerright: "right-to-center",
      leftcenter: "center-to-left",
      rightleft: "left-to-right",
      leftright: "right-to-left",
    };

    const newAnimation = animations[value + switchPosition] || null;

    onChange(value);
    setSwitchPosition(value);
    setAnimation(newAnimation);
  };

  useEffect(() => {
    switch (switchPosition) {
      case "left":
        document.documentElement.classList.remove("dark", "gazzetta");
        localStorage.theme = "light";
        break;
      case "center":
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("gazzetta");
        localStorage.theme = "dark";
        break;
      case "right":
        document.documentElement.classList.add("gazzetta");
        document.documentElement.classList.remove("dark");
        localStorage.theme = "gazzetta";
        break;
      default:
        break;
    }
  }, [switchPosition]);

  return (
    <div className={`w-[250px] h-[50px] rounded-[40px] relative bg-transparent border ${switchPosition === 'center' ? 'border-white' : 'border-black'}`}>
      <div className={`switch ${animation} ${switchPosition}-position`}></div>
      <input
        defaultChecked
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="left"
        type="radio"
        className="hidden"
        value="left"
      />
      <label
        className={`absolute cursor-pointer z-10 ${
          switchPosition === "left" && "text-white"
        }`}
        htmlFor="left"
      >
        <p className="font-bold">{labels.left.title}</p>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="center"
        type="radio"
        className="hidden"
        value="center"
      />
      <label
        className={`absolute left-[85px] cursor-pointer z-10 ${
          switchPosition === "center" && "text-black"
        }`}
        htmlFor="center"
      >
        <p className="font-bold">{labels.center.title}</p>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="right"
        type="radio"
        className="hidden"
        value="right"
      />
      <label
        className={`absolute right-[2px] cursor-pointer z-10 ${
          switchPosition === "right" && "text-white"
        }`}
        htmlFor="right"
      >
        <p className="font-bold">{labels.right.title}</p>
      </label>
    </div>
  );
}
