import { toggleDarkMode } from "@/utils/theme";
import React, { ReactNode } from "react";

interface ContentProps {
  children?: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900  dark:bg-gray-900 text-black dark:text-white">
      {/* <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
      >
        Toggle Dark Mode
      </button> */}
      {children && <div className="">{children}</div>}
    </div>
  );
};

export default Content;
