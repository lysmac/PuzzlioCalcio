interface MenuButtonProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function MenuButton({
  value,
  onClick,
  disabled,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer font-semibold overflow-hidden relative z-100 border border-pc-green group px-3 py-2`}
      disabled={disabled}
    >
      <span className="relative z-10 text-pc-green group-hover:text-white text-md duration-500">
        {value}
      </span>
      <span className="absolute w-full h-full bg-pc-green -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
      <span className="absolute w-full h-full bg-pc-green -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
    </button>
  );
}
