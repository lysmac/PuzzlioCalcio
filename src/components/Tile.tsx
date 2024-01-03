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
      className={` aspect-square flex-1 max-w-12 min-h-8 sm:min-h-16 sm:max-w-24 sm:text-4xl flex items-center justify-center font-bold text-2xl font-mono text-lt-text ${background(
        place || ""
      )}`}
    >
      {letter}
    </div>
  );
}
