import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1 className="text-5xl font-bold underline text-red-500">App.tsx</h1>
      <Link to="/test">Linking to test to test react router </Link>
    </>
  );
}
