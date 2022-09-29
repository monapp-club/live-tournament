import { Link } from "react-router-dom";
import { getRoutes } from "../../config/router";
import "./Header.css";

const Header = () => {
  const routes = getRoutes();
  return (
    <>
      <div>
        <nav>
          <ul>
            {routes.map((route) => (
              <li
                className={
                  route.path === window.location.pathname ? "active" : undefined
                }
                key={route.path}
              >
                <Link to={route.path}>{route.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
