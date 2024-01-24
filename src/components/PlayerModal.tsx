import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";

interface PlayerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PlayerModal({ open, onClose }: PlayerModalProps) {
  console.log("PlayerModal");
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Player modal"
      aria-describedby="Player modal"
    >
      <div className="absolute bg-primary-bg top-40 left-1/2 transform -translate-x-1/2 border border-primary-contrast w-80 sm:w-96">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center items-center relative p-1">
            <p className="text-lg font-bold">Highscore</p>
            <button onClick={onClose} className="absolute right-1">
              <IoClose size={30} />
            </button>
          </div>
          <div className="h-20 w-20">Spelarinfo</div>
          <div className="flex justify-center items-center py-1">
            <button onClick={onClose} className="font-bold">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
