import { Link } from "react-router-dom";

export default function GenreCard({ id, name }) {
  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg p-4">
      <h2 className="text-lg font-bold mb-2 text-purple-400">{name}</h2>
      <Link
        to={`/generos/${id}`}
        className="text-purple-400 hover:text-purple-300"
      >
        Ver filmes
      </Link>
    </div>
  );
}