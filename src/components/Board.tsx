import Tile from "./Tile";

export default function Board() {
  const wordShort = "ENDO";
  const wordArray = wordShort.split("");

  const wordLong = "QWERTUKSM";
  const wordArrayTwo = wordLong.split("");

  return (
    <>
      Board:
      <div className=" justify-center items-center flex gap-2 flex-col">
        <div className="flex w-full justify-center gap-1">
          {wordArray.map((letter) => (
            <Tile letter={letter} place="close" />
          ))}
        </div>{" "}
        <div className="flex w-full gap-1">
          {wordArrayTwo.map((letter) => (
            <Tile letter={letter} place="right" />
          ))}
        </div>
      </div>
    </>
  );
}
