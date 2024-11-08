import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function WatchLaterList() {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const watchLaterLocalStorage = JSON.parse(localStorage.getItem('watchLater')) || [];
    setWatchLater(watchLaterLocalStorage);
  }, []);

  const handleUpdate = () => {
    const watchLaterLocalStorage = JSON.parse(localStorage.getItem('watchLater')) || [];
    setWatchLater(watchLaterLocalStorage);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Filmes para Ver Depois</h1>
      {watchLater.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchLater.map((filme) => (
            <MovieCard key={filme.id} {...filme} onUpdate={handleUpdate} />
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Você não tem filmes para ver depois ainda.</p>
      )}
    </div>
  );
}