import { classNames } from "../../utils";

interface TabsSelectorProps {
  selectedTab: string;
  tabs: string[];
  onChange: (tab: string) => void;
}

const TabsSelector = ({ selectedTab, tabs, onChange }: TabsSelectorProps) => {
  return (
    <nav className="flex space-x-4 mb-4" aria-label="Tabs">
      {tabs.map((tab) => (
        <a
          key={tab}
          href="javascript:void(0)"
          onClick={() => onChange(tab)}
          className={classNames(
            tab === selectedTab
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-500 hover:text-gray-700",
            "px-3 py-2 font-medium text-sm rounded-md"
          )}
          aria-current={tab === selectedTab ? "page" : undefined}
        >
          {tab}
        </a>
      ))}
    </nav>
  );
};

export default TabsSelector;
