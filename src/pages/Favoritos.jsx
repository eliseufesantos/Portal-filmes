import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosLocalStorage);
  }, []);

  const handleUpdate = () => {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosLocalStorage);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Filmes Favoritos</h1>
      {favoritos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoritos.map((filme) => (
            <MovieCard key={filme.id} {...filme} onUpdate={handleUpdate} />
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Você não tem filmes favoritos ainda.</p>
      )}
    </div>
  );
}