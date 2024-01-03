import Menu from "./Menu";
import logo from "../../public/PClogo.svg"

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center gap-2.5 w-full pt-20 pb-8  bg-dt-bg">
      <img src={logo} alt="Logo" className="w-28 sm:w-44" />
      <div>
        <p className="text-sm">
          Guess the footballer in as few tries as possible{" "}
        </p>
      </div>
      <Menu />
    </div>
  );
}
