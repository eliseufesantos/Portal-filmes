import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  return (
    <header className="bg-purple-800 text-white flex justify-between h-14 items-center px-4">
      <div>
        <h1 className="font-bold text-xl">Portal Filmes</h1>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink to="/" className="hover:text-gray-300">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/filmes" className="hover:text-gray-300">
              Filmes
            </NavLink>
          </li>
          <li>
            <NavLink to="/generos" className="hover:text-gray-300">
              Gêneros
            </NavLink>
          </li>
          <li>
            <NavLink to="/favoritos" className="hover:text-gray-300">
              Favoritos
            </NavLink>
          </li>
          <li>
            <NavLink to="/assistidos" className="hover:text-gray-300">
              Assistidos
            </NavLink>
          </li>
          <li>
            <NavLink to="/ver-depois" className="hover:text-gray-300">
              Ver Depois
            </NavLink>
          </li>
          {isLogged && (
            <li>
              <NavLink to="/settings" className="hover:text-gray-300">
                Configurações
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <Login isLogged={isLogged} handleLogin={handleLogin} />
    </header>
  );
}