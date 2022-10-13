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
    ranking,
    setSelectedCategory,
    selectedPool,
    setSelectedPool,
  } = useContext(RootContext);

  const poolTabs =
    ranking?.[selectedCategory as CategoryEnumType]?.map((p) => p.name) || [];

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
                        src="https://api.club.ffr.fr/assoustons/wp-content/uploads/sites/1179/2021/08/cropped-logo_as_soustons_2017.png"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://api.club.ffr.fr/assoustons/wp-content/uploads/sites/1179/2021/08/cropped-logo_as_soustons_2017.png"
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
                              ? "border-blue-500 text-gray-900"
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
                  <div className="flex flex-row items-center">
                    {categories && categories?.length > 0 && (
                      <div className=" pr-2">
                        <SelectDropdown
                          options={categories.map((category) => category.name)}
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
                    {!isRankingPage && (
                      <div>
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
