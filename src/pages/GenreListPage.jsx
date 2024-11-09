import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import GenreCard from "../components/GenreCard";

export default function GenreListPage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGenres();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Gêneros de Filmes</h1>
      {genres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link key={genre.id} to={`/genres/${genre.id}`}>
              <GenreCard {...genre} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Nenhum gênero encontrado.</p>
      )}
      <Outlet />
    </div>
  );
}