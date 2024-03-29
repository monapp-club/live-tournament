import { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getNavigationRoutes } from "../../config/router";
import { Link } from "react-router-dom";
import { classNames, isCurrentPath } from "../../utils";
import { RootContext } from "../../providers/RootProvider";
import SelectDropdown from "../SelectDropdown/SelectDropdown";
import i18n from "../../i18n";
import { CategoryEnumType } from "../../api/types";
import { useAptabase } from "@aptabase/react";

const Header = () => {
  const routes = getNavigationRoutes();
  const {
    selectedCategory,
    categories,
    ranking,
    selectedPool,
    dayPart,
    featureFlags,
    setSelectedCategory,
    setSelectedPool,
    setDayPart,
  } = useContext(RootContext);
  const { trackEvent } = useAptabase();

  const poolTabs =
    ranking?.[selectedCategory as CategoryEnumType]?.map((p) => p.name) || [];

  const isRankingPage = isCurrentPath("/ranking");
  const isFieldPage = isCurrentPath("/fields");
  const isStatsPage = isCurrentPath("/stats");

  const shouldShowPoolSelector = !isStatsPage && !isRankingPage && !isFieldPage;
  const shouldShowCategorySelector =
    !isStatsPage && !isFieldPage && categories && categories?.length > 0;
  const shouldShowDayPartSelector =
    !isStatsPage && featureFlags?.enable_period_selector;

  const onSelectCategory = (value: string) => {
    setSelectedCategory(value as CategoryEnumType);
    trackEvent("select_category", { category: value });
  };

  const onSelectPool = (value: string) => {
    setSelectedPool(value);
    trackEvent("select_pool", { pool: value });
  };

  const onSelectDayPart = (value: string) => {
    if (value === i18n.t("navigation:header:selector:dayPart:am")) {
      setDayPart("am");
      trackEvent("select_day_part", { dayPart: "am" });
    } else {
      setDayPart("pm");
      trackEvent("select_day_part", { dayPart: "pm" });
    }
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Link to="/">
                        <img
                          className="block h-10 w-auto lg:hidden"
                          src="/logo512.png"
                          alt="AS Soustons Rugby"
                        />
                        <img
                          className="hidden h-10 w-auto lg:block"
                          src="/logo512.png"
                          alt="AS Soustons Rugby"
                        />
                      </Link>
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
                    {shouldShowDayPartSelector && (
                      <div className="pr-2">
                        <SelectDropdown
                          options={["am", "pm"].map((d) =>
                            i18n.t(`navigation:header:selector:dayPart:${d}`)
                          )}
                          onSelect={onSelectDayPart}
                          selected={i18n.t(
                            `navigation:header:selector:dayPart:${dayPart}`
                          )}
                          placeholder={i18n.t(
                            `header.navigation.selector.dayPart.${dayPart}`
                          )}
                          direction="left"
                        />
                      </div>
                    )}
                    {shouldShowCategorySelector && (
                      <div className="pr-2">
                        <SelectDropdown
                          options={categories.map((category) => category.name)}
                          onSelect={onSelectCategory}
                          selected={selectedCategory}
                          placeholder={i18n.t(
                            "navigation:header:selector:category"
                          )}
                          direction="left"
                        />
                      </div>
                    )}
                    {shouldShowPoolSelector && (
                      <div>
                        <SelectDropdown
                          options={[
                            i18n.t("navigation:header:selector:pool"),
                            ...poolTabs,
                          ]}
                          onSelect={onSelectPool}
                          selected={selectedPool}
                          placeholder={i18n.t(
                            "navigation:header:selector:pool"
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {routes.map((item) => (
                    <Disclosure.Button
                      key={item.title}
                      as="a"
                      href={item.path}
                      className={classNames(
                        isCurrentPath(item.path)
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={
                        isCurrentPath(item.path) ? "page" : undefined
                      }
                    >
                      {item.title}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
