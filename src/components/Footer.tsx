export default function Footer() {
  return (
    <div className="mt-20 p-5 bg-lime-50 flex flex-row gap-5 items-center">
      <div className="flex flex-col gap-1">
        <p className="font-bold">Github repository</p>
        <a
          href="https://github.com/lysmac/PuzzlioCalcio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold"
        >
          Github
        </a>
      </div>
      <div className="flex flex-col">
        <p className="font-bold">Developers</p>
        <div className="flex flex-row gap-3">
          <a
            href="https://github.com/lysmac"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Carl
          </a>
          <a
            href="https://github.com/Edvindjulic"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Edvin
          </a>
        </div>
      </div>
    </div>
  );
}
