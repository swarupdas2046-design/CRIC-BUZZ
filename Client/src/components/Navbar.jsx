import { NavLink } from "react-router";
import { Search } from "lucide-react";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div>
          <NavLink
            to="/"
            className="text-4xl font-bold text-blue-600"
          >
            CricBuzz Pro
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={navLinkClass}>
            Live Scores
          </NavLink>

          <NavLink to="/tournaments" className={navLinkClass}>
            Tournaments
          </NavLink>

          <NavLink to="/teams" className={navLinkClass}>
            Teams
          </NavLink>

          <NavLink to="/players" className={navLinkClass}>
            Players
          </NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search matches, players, teams..."
              className="w-64 outline-none text-sm"
            />
          </div>

          {/* Auth */}
          <NavLink
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;