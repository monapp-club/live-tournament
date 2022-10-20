/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getNavigationRoutes } from "../../../config/router";
import { Link } from "react-router-dom";
import { classNames, isCurrentPath } from "../../../utils";
import config from "../landing.config";
import { useFetchSponsors } from "../../../api/hooks";

const LandingPage = () => {
  const routes = getNavigationRoutes();
  const { data } = useFetchSponsors();

  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-8 md:pb-12 lg:w-full lg:max-w-2xl lg:pb-16 xl:pb-10">
            <svg
              className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                      <Link to={"/"}>
                        <span className="sr-only">{config.navTitle}</span>
                        <img
                          alt={config.logo.altName}
                          className="h-10 w-auto sm:h-15"
                          src={config.logo.src}
                        />
                      </Link>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                          <span className="sr-only">Open main menu</span>
                          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                    {routes.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className={classNames(
                          "font-medium text-gray-500 hover:text-gray-900",
                          isCurrentPath(item.path)
                            ? "border-blue-500 text-gray-900"
                            : ""
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <div>
                        <img className="h-8 w-auto" src="/logo512.png" alt="" />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                          <span className="sr-only">Close main menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="space-y-1 px-2 pt-2 pb-3">
                      {routes.map((item) => (
                        <Link
                          key={item.title}
                          to={item.path}
                          className={classNames(
                            "block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                            isCurrentPath(item.path)
                              ? "border-blue-500 text-gray-900"
                              : ""
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-4 sm:px-6 md:mt-8 lg:mt-12 lg:px-8 xl:mt-15">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">{config.titlePart1}</span>{" "}
                  <span className="block text-blue-600 xl:inline">
                    {config.titlePart2}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  {config.body}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div>
                    <Link
                      to={config.mainButton.link}
                      className="flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {config.mainButton.label}
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3 rounded-md shadow">
                    <a
                      href={config.secondaryButton.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      {config.secondaryButton.label}
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src="https://api.club.ffr.fr/assoustons/wp-content/uploads/sites/1179/2021/10/p33_edr-bas-droite-1024x683.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-green-600 font-semibold tracking-wide uppercase">
              Partenaires
            </p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-2">
              {data?.map((sponsor, index) => (
                <a
                  key={index.toString()}
                  href={sponsor.external_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="h-20 w-auto"
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
