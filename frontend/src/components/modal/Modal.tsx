import { ReactNode } from "react";

type widths = 'max-w-xs' |'max-w-sm' | 'max-w-md' |'max-w-lg' | 'max-w-xl'

interface ModalTypes {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: widths
}

const Modal = (params : ModalTypes) => {
  const { isOpen, onClose, children, width } = params

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50">
      <div className={`relative w-full ${width} rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
