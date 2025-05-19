import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">IN ADVENTURES</Link>
      <nav>
        <Link to="/" className="text-sm text-gray-700 hover:text-blue-500">Home</Link>
      </nav>
    </header>
  );
}