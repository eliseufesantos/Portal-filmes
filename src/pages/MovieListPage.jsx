import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { CircularProgress } from "@mui/material";

export default function MovieListPage() {
  const [search, setSearch] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const movieIds = new Set(filmes.map(filme => filme.id));

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&page=${page}`
        );
        const newMovies = response.data.results.filter(filme => !movieIds.has(filme.id));
        setFilmes((prevFilmes) => [...prevFilmes, ...newMovies]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    fetchMovies();
  }, [page]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR`
        );
        setFilmes(response.data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=pt-BR&query=${e.target.value}`
      );
      setFilmes(response.data.results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-4xl font-bold mb-8 text-purple-400">Veja o catálogo completo de filmes</h2>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar filmes..."
        className="w-full p-2 mb-8 text-black rounded"
      />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress className="text-purple-400" />
          <span className="text-2xl ml-4">Carregando...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filmes.map((filme) => (
              <div key={filme.id} className="flex justify-center mb-5">
                <MovieCard {...filme} />
              </div>
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