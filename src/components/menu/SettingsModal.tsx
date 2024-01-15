import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import ThemeSwitcher from "./menu-settings/ThemeSwitcher";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const handleThemeChange = (value: string | number | boolean) => {
    console.log("Selected theme:", value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Settings modal"
      aria-describedby="Settings modal"
      hideBackdrop
    >
      <div className="absolute bg-white top-60 left-1/2 transform -translate-x-1/2 border border-black h-[350px] w-full sm:max-w-lg md:max-w-lg">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-row justify-center items-center relative p-1 bg-yellow-300">
            <p className="text-lg font-bold">Settings</p>
            <button onClick={onClose} className="bg-gray-200 absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex justify-center">
            <ThemeSwitcher onChange={handleThemeChange} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-1">
            <button onClick={onClose} className="font-bold">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
