import Board from "./components/Board";
import Header from "./components/Header";
import Keyboard from "./components/keyboard/Keyboard";
import "./index.css";

export default function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col justify-center items-center w-full dark:bg-dt-bg">
        <Board />
        <Keyboard />
      </main>
      <footer>Footer</footer>
    </>
  );
}

// <h1 className="text-5xl font-bold underline text-red-500">App.tsx</h1>
// <Link to="/test">Linking to test to test react router </Link>
