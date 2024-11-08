import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import MovieCard from "../components/MovieCard";
import Recomendados from "../components/Recomendados";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const popularResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      );
      setPopularMovies(popularResponse.data.results);

      const upcomingResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      );
      setUpcomingMovies(upcomingResponse.data.results);

      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      );
      setTvShows(tvResponse.data.results);
    }

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Home</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">Filmes Populares</h2>
        <Slider {...settings}>
          {popularMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <MovieCard {...movie} />
            </div>
          ))}
        </Slider>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">Filmes que Estão por Vir</h2>
        <Slider {...settings}>
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <MovieCard {...movie} />
            </div>
          ))}
        </Slider>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">Séries de TV</h2>
        <Slider {...settings}>
          {tvShows.map((show) => (
            <div key={show.id} className="px-2">
              <MovieCard {...show} />
            </div>
          ))}
        </Slider>
      </section>

      <Recomendados />
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "2px", zIndex: 1, fontSize: "30px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "2px", zIndex: 1, fontSize: "30px" }}
      onClick={onClick}
    />
  );
}