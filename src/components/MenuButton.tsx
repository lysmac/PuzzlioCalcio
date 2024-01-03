interface MenuButtonProps {
  value: string;
  onClick: () => void;
}

export default function MenuButton({ value, onClick }: MenuButtonProps) {
  return (
    <button onClick={onClick} className={`min-w-24 h-8 text-sm font-bold bg-white hover:bg-gray-300 rounded-md`}>
      {value}
    </button>
  );
}
