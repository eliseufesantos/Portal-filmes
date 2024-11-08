import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { CircularProgress } from "@mui/material";

export default function MoviesByGenrePage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const movieIds = new Set(movies.map(movie => movie.id));

  useEffect(() => {
    async function fetchMoviesByGenre() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&with_genres=${id}&language=pt-BR&page=${page}`
        );
        const newMovies = response.data.results.filter(movie => !movieIds.has(movie.id));
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    async function fetchGenreName() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
        );
        const genre = response.data.genres.find((genre) => genre.id === parseInt(id));
        setGenreName(genre ? genre.name : "Gênero Desconhecido");
      } catch (error) {
        console.error(error);
      }
    }

    fetchMoviesByGenre();
    fetchGenreName();
  }, [id, page]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">{genreName}</h1>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress className="text-purple-400" />
          <span className="text-2xl ml-4">Carregando...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {loadingMore ? (
              <CircularProgress className="text-purple-400" />
            ) : (
              <button
                onClick={handleLoadMore}
                className="bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded"
              >
                Carregar Mais
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}