export default function CardContainer({ titulo, children }) {
    return (
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-purple-400">{titulo}</h1>
        <div className="flex overflow-x-scroll space-x-4">
          {children}
        </div>
      </div>
    );
  }