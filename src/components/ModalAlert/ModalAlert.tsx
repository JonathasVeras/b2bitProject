import React from "react";

interface IModalAlertProps {
  title: string;
  message: string;
  icon: React.ReactNode;
  onClose: () => void;
}

const ModalAlert: React.FC<IModalAlertProps> = ({ title, message, icon, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="mt-4">
          <p>{message}</p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#02274F] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAlert;
