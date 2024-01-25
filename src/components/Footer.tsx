import { FaEnvelope, FaGithub } from "react-icons/fa";
import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="mt-8 p-2 bg-primary-bg border-t border-primary-contrast flex flex-row justify-around sm:justify-center sm:gap-40">
      <Logo className="w-20" />
      <div className="flex flex-col">
        <p className="font-bold text-primary-text">Developers</p>
        <div className="flex flex-row gap-3">
          <p className="font-bold primary-text w-10">Carl</p>
          <a
            href="https://github.com/lysmac"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaGithub color="primary-contrast" size={20} />
          </a>
          <a href="mailto:calle@lysmask.se" className="flex items-center gap-2">
            <FaEnvelope color="primary-contrast" size={20} />
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <p className="font-bold primary-text w-10">Edvin</p>
          <a
            href="https://github.com/Edvindjulic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaGithub color="primary-contrast" size={20} />
          </a>
          <a
            href="mailto:djulicedvin@gmail.com"
            className="flex items-center gap-2"
          >
            <FaEnvelope color="primary-contrast" size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
