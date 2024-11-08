import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`
      );
      setMovie(movieResponse.data);

      const castResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`
      );
      setCast(castResponse.data.cast);

      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`
      );
      const officialTrailer = trailerResponse.data.results.find(
        (video) => video.type === "Trailer" && video.official
      );
      setTrailer(officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : "");
    }

    fetchMovie();
  }, [id]);

  if (!movie) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <CircularProgress className="text-purple-400" />
      <span className="text-2xl ml-4">Carregando...</span>
    </div>
  );

  return (
    <div
      className="bg-gray-900 text-white min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
    >
      <div className="bg-gray-800 bg-opacity-75 rounded-lg p-8 max-w-3xl mx-auto my-8">
        <h1 className="text-4xl font-bold mb-4 text-purple-400">{movie.title}</h1>
        <p className="mb-4 text-gray-300">{movie.overview}</p>
        <p className="mb-4 text-gray-300 flex items-center">
          <StarIcon className="mr-2" /> Avaliação: {movie.vote_average}
        </p>
        <p className="mb-4 text-gray-300 flex items-center">
          <CalendarTodayIcon className="mr-2" /> Data de lançamento: {movie.release_date}
        </p>
        <h2 className="text-2xl font-bold mb-2 text-purple-400">Elenco</h2>
        <ul className="mb-4 text-gray-300">
          {cast.slice(0, 10).map((actor) => (
            <li key={actor.cast_id}>{actor.name} como {actor.character}</li>
          ))}
        </ul>
        {trailer ? (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-purple-400">Trailer</h2>
            <iframe
              width="560"
              height="315"
              src={trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        ) : (
          <p className="text-red-500 font-bold text-xl">Trailer não disponível.</p>
        )}
      </div>
    </div>
  );
}