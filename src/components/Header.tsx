import Menu from "./Menu";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-60 bg-gt-bg">
      <div>Logo</div>
      <div>Text under loggan</div>
      <Menu />
    </div>
  );
}
