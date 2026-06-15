import { useLocation } from "react-router";
import { Bell, ChevronRight } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const PATH_LABELS = {
  "/admin": "Dashboard",
  "/admin/tournaments": "Tournaments",
  "/admin/teams": "Teams",
  "/admin/players": "Players",
  "/admin/matches": "Matches",
  "/admin/live-scoring": "Live Scoring",
  "/admin/users": "Users",
  "/admin/settings": "Settings",
};

const Topbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const current = PATH_LABELS[pathname] || "Dashboard";
  const initials = (user?.name || "Admin").charAt(0).toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <span>Admin</span>
        <ChevronRight size={14} />
        <span className="font-medium text-gray-900">{current}</span>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
            <p className="flex items-center justify-end gap-1 text-xs text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Online
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
