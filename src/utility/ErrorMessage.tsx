import React, { useEffect } from "react";

interface ErrorMessageProps {
  message: string;
  clearError: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, clearError }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearError();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, clearError]);

  return (
    <div className="fixed top-5 right-5 md:top-10 md:right-10 z-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-7 py-3 rounded relative" role="alert">
        <strong className="font-bold">エラー!</strong>
        <span className="block sm:inline">{message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-2" onClick={clearError}>
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.859l-4.708-4.708 4.708-4.708-1.414-1.414-4.708 4.708-4.708-4.708-1.414 1.414 4.708 4.708-4.708 4.708 1.414 1.414 4.708-4.708 4.708 4.708z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ErrorMessage;
