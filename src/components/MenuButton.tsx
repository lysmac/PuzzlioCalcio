interface MenuButtonProps {
  value: string;
  onClick: () => void;
}

export default function MenuButton({ value, onClick }: MenuButtonProps) {
  return (
    <button onClick={onClick} className="w-20 h-8 bg-lt-bg text-sm">
      {value}
    </button>
  );
}
