import Logo from "./Logo";
import Menu from "./menu/Menu";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full py-8 sm:pt-20 pb-8 ">
      <Logo />

      <Menu />
    </div>
  );
}
