/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils";

interface SelectDropdownProps {
  placeholder: string;
  options: string[];
  selected?: string;
  direction?: "left" | "right";
  onSelect: (value: string) => void;
}

const SelectDropdown = ({
  placeholder,
  options,
  selected,
  direction = "right",
  onSelect,
}: SelectDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border truncate border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {selected ?? placeholder}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            direction === "right"
              ? "right-0 origin-top-right"
              : "left-0 origin-top-left",
            "absolute  z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          )}
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item>
                <a
                  href="javascript:void(0)"
                  onClick={() => onSelect(option)}
                  className={classNames(
                    selected === option
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {option}
                </a>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SelectDropdown;
