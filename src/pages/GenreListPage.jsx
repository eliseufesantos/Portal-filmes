import { useEffect, useState } from "react";
import axios from "axios";
import GenreCard from "../components/GenreCard";

export default function GenreListPage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
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
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Gêneros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <GenreCard key={genre.id} id={genre.id} name={genre.name} />
        ))}
      </div>
    </div>
  );
}