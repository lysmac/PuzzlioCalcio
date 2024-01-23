interface MenuButtonProps {
  value: string;
  onClick: () => void;
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
      className={`min-w-24 h-8 text-sm font-bold bg-white hover:bg-gray-300 rounded-md text-lt-text`}
      disabled={disabled}
    >
      {value}
    </button>
  );
}
