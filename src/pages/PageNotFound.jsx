import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold mb-4 text-purple-400">404</h1>
      <p className="text-2xl mb-8">Página não encontrada</p>
      <Link to="/" className="text-purple-400 hover:text-purple-300 text-lg">
        Voltar para a Home
      </Link>
    </div>
  );
}

export default PageNotFound;