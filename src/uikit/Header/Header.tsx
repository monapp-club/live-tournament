import { Disclosure } from "@headlessui/react";
import { classNames, isCurrentPath } from "../../utils";
import { getRoutes } from "../../config/router";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RootContext } from "../../providers/RootProvider";
import { CategoryEnumType } from "../../api/types";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import i18n from "../../i18n";

const Header = () => {
  const routes = getRoutes();
  const {
    selectedCategory,
    categories,
    setSelectedCategory,
    selectedPool,
    setSelectedPool,
  } = useContext(RootContext);

  const categoryTabs = Object.keys(categories || {});
  const poolTabs =
    categories?.[selectedCategory as CategoryEnumType]?.map((p) => p.name) ||
    [];

  const isRankingPage = isCurrentPath("/");

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {routes.map((item) => (
                        <Link
                          key={item.title}
                          to={item.path}
                          className={classNames(
                            isCurrentPath(item.path)
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          )}
                          aria-current={
                            isCurrentPath(item.path) ? "page" : undefined
                          }
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row">
                    {categoryTabs?.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 pb-3">
                        <SelectDropdown
                          options={[
                            i18n.t("navigation:header:selector:category"),
                            ...categoryTabs,
                          ]}
                          onSelect={(value) =>
                            setSelectedCategory(value as CategoryEnumType)
                          }
                          selected={selectedCategory}
                          placeholder={i18n.t(
                            "navigation:header:selector:category"
                          )}
                        />
                      </div>
                    )}
                    {poolTabs?.length > 0 && !isRankingPage && (
                      <div className="border-t border-gray-200 pt-4 pb-3">
                        <SelectDropdown
                          options={[
                            i18n.t("navigation:header:selector:pool"),
                            ...poolTabs,
                          ]}
                          onSelect={setSelectedPool}
                          selected={selectedPool}
                          placeholder={i18n.t(
                            "navigation:header:selector:pool"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
