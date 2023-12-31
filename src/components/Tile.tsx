export default function Tile({
  letter,
  place,
}: {
  letter?: string;
  place?: "right" | "close" | "wrong" | null;
}) {
  const background = (place: string) => {
    switch (place) {
      case "right":
        return "bg-pc-green";
      case "wrong":
        return "bg-gray-50";
      case "close":
        return "bg-pc-yellow";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div
      className={` uppercase aspect-square w-8 sm:min-w-12  sm:text-3xl flex items-center justify-center font-bold text-2xl font-mono text-lt-text ${background(
        place || ""
      )}`}
    >
      {letter}
    </div>
  );
}
