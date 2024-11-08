import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CircularProgress } from "@mui/material";

export default function MovieCard({ id, title, poster_path, release_date, vote_average, onUpdate }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const watched = JSON.parse(localStorage.getItem('watched')) || [];
    const watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];

    if (Array.isArray(favoritos)) {
      setIsFavorite(favoritos.some((movie) => movie.id === id));
    }
    if (Array.isArray(watched)) {
      setIsWatched(watched.some((movie) => movie.id === id));
    }
    if (Array.isArray(watchLater)) {
      setIsWatchLater(watchLater.some((movie) => movie.id === id));
    }
  }, [id]);

  const handleFavorite = (movie) => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (!Array.isArray(favoritos)) {
      favoritos = [];
    }

    if (isFavorite) {
      favoritos = favoritos.filter((fav) => fav.id !== movie.id);
    } else {
      favoritos.push(movie);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    setIsFavorite(!isFavorite);
    if (onUpdate) onUpdate();
  };

  const handleWatched = (movie) => {
    let watched = JSON.parse(localStorage.getItem('watched')) || [];

    if (!Array.isArray(watched)) {
      watched = [];
    }

    if (isWatched) {
      watched = watched.filter((wat) => wat.id !== movie.id);
    } else {
      watched.push(movie);
    }

    localStorage.setItem('watched', JSON.stringify(watched));
    setIsWatched(!isWatched);
    if (onUpdate) onUpdate();
  };

  const handleWatchLater = (movie) => {
    let watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];

    if (!Array.isArray(watchLater)) {
      watchLater = [];
    }

    if (isWatchLater) {
      watchLater = watchLater.filter((wat) => wat.id !== movie.id);
    } else {
      watchLater.push(movie);
    }

    localStorage.setItem('watchLater', JSON.stringify(watchLater));
    setIsWatchLater(!isWatchLater);
    if (onUpdate) onUpdate();
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg w-64">
      {!imageLoaded && (
        <div className="flex items-center justify-center h-96">
          <CircularProgress className="text-purple-400" />
        </div>
      )}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className={`w-full h-96 object-cover ${imageLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-400 mb-2 flex items-center">
          <CalendarTodayIcon className="mr-1" /> {release_date}
        </p>
        <p className="text-gray-400 mb-4 flex items-center">
          <StarIcon className="mr-1" /> {vote_average}
        </p>
        <Link
          to={`/filmes/${id}`}
          className="text-purple-400 hover:text-purple-300"
        >
          Saber mais
        </Link>
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <button
              onClick={() => handleFavorite({ id, title, poster_path, release_date, vote_average })}
              className="text-red-500 hover:text-red-400"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
            <span className="block text-xs text-white">Favorito</span>
          </div>
          <div className="text-center">
            <button
              onClick={() => handleWatched({ id, title, poster_path, release_date, vote_average })}
              className="text-green-500 hover:text-green-400"
            >
              {isWatched ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
            <span className="block text-xs text-white">Assistido</span>
          </div>
          <div className="text-center">
            <button
              onClick={() => handleWatchLater({ id, title, poster_path, release_date, vote_average })}
              className="text-yellow-500 hover:text-yellow-400"
            >
              {isWatchLater ? <WatchLaterIcon /> : <WatchLaterOutlinedIcon />}
            </button>
            <span className="block text-xs text-white">Ver Depois</span>
          </div>
        </div>
      </div>
    </div>
  );
}