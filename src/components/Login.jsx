export default function Login({ isLogged, handleLogin }) {
  return (
    <div className="flex gap-4 items-center">
      {isLogged && <p className="text-white">Olá, usuário</p>}
      <button
        onClick={handleLogin}
        className={`${
          isLogged ? "bg-red-500 hover:bg-red-400" : "bg-green-600 hover:bg-green-500"
        } text-white px-4 py-2 rounded`}
      >
        {isLogged ? "Logout" : "Login"}
      </button>
    </div>
  );
}