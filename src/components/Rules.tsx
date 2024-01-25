interface RulesProps {
  showTitle?: boolean;
}

export default function Rules({ showTitle = true }: RulesProps) {
  return (
    <div className="text-sm">
      <div className="flex flex-col gap-3">
        {showTitle && (
          <h3 className="text-xl font-bold text-center">How to play</h3>
        )}
        <div className="flex flex-col">
          <p>
            Guess the active football player's name in{" "}
            <span className="font-bold">5 tries</span>. Start by guessing a
            name, typing random letters does not work. Use the colors,
            nationality and position as clues - game is won when all tiles are
            green.
          </p>
        </div>
        <div className="w-80 flex flex-col gap-0.5">
          <p>
            <span className="font-bold text-black bg-pc-green">Green tile</span>{" "}
            = correct letter in correct position
          </p>
          <p>
            <span className="font-bold text-black bg-pc-yellow">
              Yellow tile
            </span>{" "}
            = correct letter in wrong position
          </p>
          <p>
            <span className="font-bold text-black bg-white">White tile</span> =
            wrong letter
          </p>
          <p>
            <span className="font-bold text-black bg-gray-400">Grey key</span> =
            wrong letter
          </p>
        </div>
      </div>
    </div>
  );
}
