import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import SelectLetters from "./SelectLetters";
import ThemeSwitcher from "./ThemeSwitcher";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Settings modal"
      aria-describedby="Settings modal"
      hideBackdrop
    >
      <div className="absolute bg-primary-bg top-60 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-full sm:max-w-lg">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">Settings</p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-8 w-full sm:w-[360px] sm:m-auto px-3 py-1">
            <div className="flex flex-col mt-2">
              <p>Theme</p>
              <div className="flex justify-center">
                <ThemeSwitcher />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p>Number of letters</p>
              <SelectLetters />
            </div>
            <div className="flex flex-row justify-between">
              <p>Placement of delete</p>
              <p>Toggle for delete</p>
            </div>
            <div className="flex justify-center items-center p-1">
              <button onClick={onClose} className="font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
