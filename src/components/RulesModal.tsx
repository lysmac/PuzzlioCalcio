import { Modal } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Rules from "./Rules";

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RulesModal({ open, onClose }: RulesModalProps) {
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const handleClose = () => {
    setAnimationClass("animate__fadeOut");

    setTimeout(() => {
      onClose();
      setAnimationClass("animate__fadeIn");
    }, 500);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Rules modal"
      aria-describedby="Rules modal"
      className={`animate__animated ${animationClass} animate__faster`}
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.4)" } },
      }}
    >
      <div className="absolute bg-primary-bg top-56 sm:top-60 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">How to play</p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-8 w-80 m-auto px-3 py-1">
            <Rules showTitle={false} />
          </div>
          <div className="flex justify-center items-center py-1">
            <button onClick={handleClose} className="font-bold">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
