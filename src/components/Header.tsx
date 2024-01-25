import Logo from "./Logo";
import Menu from "./menu/Menu";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full pt-4 pb-4 ">
      <Logo />
      <Menu />
    </div>
  );
}
