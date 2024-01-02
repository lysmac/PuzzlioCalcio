export default function Tile({
  letter,
  place,
}: {
  letter?: string;
  place?: string;
}) {
  const background = (place: string) => {
    switch (place) {
      case "right":
        return "bg-pc-green";
      case "wrong":
        return "";
      case "close":
        return "bg-pc-yellow";
      default:
        return "";
    }
  };

  return (
    <div
      className={`border-2 p-2 min-w-14 min-h-14 flex items-center justify-center font-bold text-xl ${background(
        place
      )}`}
    >
      {letter}
    </div>
  );
}
