import logo from "../../public/PClogo.svg";
import Menu from "./menu/Menu";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full py-8 sm:pt-20 pb-8">
      <img src={logo} alt="Logo" className="w-32 sm:w-40" />
      <div>
        <p className="text-sm ">
          Guess the footballer in as few tries as possible{" "}
        </p>
      </div>
      <Menu />
    </div>
  );
}
