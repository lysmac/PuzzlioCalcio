import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import SelectLeague from "./SelectLeague";
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
      <div className="absolute bg-primary-bg top-40 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">Settings</p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-8 w-80 m-auto px-3 py-1">
            <div className="flex flex-col">
              <p className="font-bold">Theme</p>
              <div className="flex justify-center">
                <ThemeSwitcher />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">Number of letters</p>
              <SelectLetters />
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold">Select league</p>
              <SelectLeague />
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold">Placement of delete</p>
              <p>Toggle for delete</p>
            </div>
            <div className="flex justify-center items-center py-1">
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
