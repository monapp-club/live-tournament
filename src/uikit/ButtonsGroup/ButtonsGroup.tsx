import React from "react";
import { classNames } from "../../utils";

interface ButtonsGroupProps {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
}

const ButtonsGroup = ({ options, selected, onSelect }: ButtonsGroupProps) => {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      {options.map((option, index) => (
        <button
          type="button"
          onClick={() => onSelect(option)}
          className={classNames(
            "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
            index === 0 ? "rounded-l-md" : "-ml-px",
            index === options.length - 1 ? "rounded-r-md" : "",
            selected === option ? "bg-indigo-50 text-indigo-700" : ""
          )}
        >
          {option}
        </button>
      ))}
    </span>
  );
};

export default ButtonsGroup;
