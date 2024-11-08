import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

export default function Recomendados() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const watched = JSON.parse(localStorage.getItem('watched')) || [];
    const watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];

    const allMovies = [...favoritos, ...watched, ...watchLater];

    if (allMovies.length > 0) {
      const fetchRecommendations = async () => {
        const recommendations = [];
        const movieIds = new Set();
        for (const movie of allMovies) {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`
            );
            response.data.results.forEach((recMovie) => {
              if (!movieIds.has(recMovie.id)) {
                movieIds.add(recMovie.id);
                recommendations.push(recMovie);
              }
            });
          } catch (error) {
            console.error("Erro ao buscar recomendações:", error);
          }
        }
        setRecommendedMovies(recommendations.slice(0, 20)); 
        setLoading(false);
      };

      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-4 text-purple-400">Recomendados para você</h2>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-2xl ml-4">Carregando...</span>
        </div>
      ) : recommendedMovies.length > 0 ? (
        <Slider {...settings}>
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <MovieCard {...movie} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-red-500 text-xl text-left">Não há nada para sugerir no momento. Coloque filmes nos favoritos, assistidos ou para ver depois, e atualize a página para surgir recomendações.</p>
      )}
    </section>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "2px", zIndex: 1, fontSize: "30px", top: "50%", transform: "translateY(-50%)" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "2px", zIndex: 1, fontSize: "30px", top: "50%", transform: "translateY(-50%)" }}
      onClick={onClick}
    />
  );
}