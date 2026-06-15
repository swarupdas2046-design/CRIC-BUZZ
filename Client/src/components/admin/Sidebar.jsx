import { NavLink } from "react-router";
import {
  LayoutDashboard, Trophy, Users, User, Activity, Radio, Shield,
  Settings, LogOut, Plus,
} from "lucide-react";

import { useLogout } from "../../hooks/useLogout";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/tournaments", label: "Tournaments", icon: Trophy },
  { to: "/admin/teams", label: "Teams", icon: Users },
  { to: "/admin/players", label: "Players", icon: User },
  { to: "/admin/matches", label: "Matches", icon: Activity },
  { to: "/admin/live-scoring", label: "Live Scoring", icon: Radio },
  { to: "/admin/users", label: "Users", icon: Shield },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
  }`;

const Sidebar = () => {
  const logout = useLogout();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">A</div>
        <div>
          <p className="text-sm font-bold text-gray-900">Admin Portal</p>
          <p className="text-xs text-gray-500">Management Suite</p>
        </div>
      </div>

      <div className="px-4 pb-3">
        <NavLink to="/admin/matches" className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus size={16} />
          Start New Match
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-gray-200 px-3 py-4">
        <NavLink to="/admin/settings" className={navLinkClass}>
          <Settings size={18} />
          Settings
        </NavLink>
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
