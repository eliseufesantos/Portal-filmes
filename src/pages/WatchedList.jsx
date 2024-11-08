import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function WatchedList() {
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const watchedLocalStorage = JSON.parse(localStorage.getItem('watched')) || [];
    setWatched(watchedLocalStorage);
  }, []);

  const handleUpdate = () => {
    const watchedLocalStorage = JSON.parse(localStorage.getItem('watched')) || [];
    setWatched(watchedLocalStorage);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Filmes Assistidos</h1>
      {watched.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watched.map((filme) => (
            <MovieCard key={filme.id} {...filme} onUpdate={handleUpdate} />
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Você não tem filmes assistidos ainda.</p>
      )}
    </div>
  );
}