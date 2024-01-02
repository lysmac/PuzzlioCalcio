import Tile from "./Tile";

export default function Board() {
  const word = "HELLO";
  const wordArray = word.split("");
  console.log(wordArray);
  return (
    <>
      Board:
      <div className="outline max-w-screen-md justify-center items-center flex gap-2">
        {wordArray.map((letter) => (
          <Tile letter={letter} place="right" />
        ))}
      </div>
    </>
  );
}
