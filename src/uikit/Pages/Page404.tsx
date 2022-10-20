import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-blue-600 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              Oops! Page non trouvée
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              La page que vous recherchez n'existe pas.
            </p>
            <Link
              to={"/"}
              className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
            >
              Revenir à l'accueil
            </Link>
          </div>
          <div className="mt-4">
            <img
              src="https://api.club.ffr.fr/assoustons/wp-content/uploads/sites/1179/2021/10/p33_edr-bas-droite-1024x683.jpg"
              alt="img"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
