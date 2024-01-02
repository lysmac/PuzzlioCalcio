import Keyboard from "./components/Keyboard";
import "./index.css";

export default function App() {
  return (
    <>
      <header className="w-full h-[80px] border-b-2 border-solid border-red-500">
        Header
      </header>
      <main className="flex justify-center items-center w-full h-auto bg-dt-bg">
        <Keyboard />
      </main>
      <footer>Footer</footer>
    </>
  );
}

// <h1 className="text-5xl font-bold underline text-red-500">App.tsx</h1>
// <Link to="/test">Linking to test to test react router </Link>
