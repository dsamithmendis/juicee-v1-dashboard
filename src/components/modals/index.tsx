"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full h-full p-6 relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl md:top-5 md:right-5 text-gray-700 hover:text-pink-700 cursor-pointer md:text-4xl font-extrabold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
