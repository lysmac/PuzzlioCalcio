import { CSSProperties } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const canvasStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function Confetti() {
  return (
    <Fireworks autorun={{ speed: 2, duration: 5000 }} style={canvasStyles} />
  );
}
