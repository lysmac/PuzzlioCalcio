import Tile from "./Tile";

export default function Board() {
  const wordShort = "ENDO";
  const wordArray = wordShort.split("");

  const wordLong = "QRTMPLIXN";
  const wordArrayTwo = wordLong.split("");

  console.log(wordArray);
  return (
    <>
      Board:
      <div className="outline bg-slate-400 justify-center items-center flex gap-2 flex-col">
        <div className="flex w-full justify-center gap-2">
          {wordArray.map((letter) => (
            <Tile letter={letter} place="close" />
          ))}
        </div>{" "}
        <div className="flex w-full gap-1 lg:gap-2">
          {wordArrayTwo.map((letter) => (
            <Tile letter={letter} place="right" />
          ))}
        </div>
      </div>
    </>
  );
}
