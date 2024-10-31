import React from "react";
import "./modal.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement; // Type assertion for target
    if (target.id === "modal") {
      onClose();
    }
  };

  return (
    <div className="modal " id="modal" onClick={(e) => handleBackClick(e)}>
      <div
        className="modal-content min-w-[280px] opacity-0 translate-y-10 transition-all duration-500 delay-1000 animate-fade-up"
        id="modal-content"
      >
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
