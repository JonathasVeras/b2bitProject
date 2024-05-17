import React from "react";
import loading from "../../assets/loading/loading.gif";

interface ILoadingProps {
    isLoading: boolean;
  }

const Loading:React.FC<ILoadingProps> = ({isLoading}) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <img src={loading} alt="Loading..." className="w-16 h-16" />
        </div>
      )}
    </>
  );
};

export default Loading;
