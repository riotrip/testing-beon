import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState({
    master: true,
    transaction: false,
    report: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path)
      ? "bg-slate-700 text-white font-semibold"
      : "text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200";
  };

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-slate-900 flex flex-col shadow-xl">
        <div className="p-6 mb-2 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-white tracking-wider">
            SIM-RT
          </h2>
          <p className="text-sm text-slate-400 mt-1">Sistem Kependudukan</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <Link
            to="/dashboard"
            className={`block px-4 py-3 rounded-lg ${isActive("/dashboard")}`}
          >
            Dashboard
          </Link>

          <div className="pt-2">
            <button
              onClick={() => toggleMenu("master")}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="font-bold uppercase text-xs tracking-wider">
                Master
              </span>
              <ChevronIcon isOpen={openMenu.master} />
            </button>

            {openMenu.master && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  to="/master/rumah"
                  className={`block px-4 py-2 rounded-lg text-sm ${isActive("/master/rumah")}`}
                >
                  Rumah
                </Link>
                <Link
                  to="/master/penghuni"
                  className={`block px-4 py-2 rounded-lg text-sm ${isActive("/master/penghuni")}`}
                >
                  Penghuni
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => toggleMenu("transaction")}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="font-bold uppercase text-xs tracking-wider">
                Transaksi
              </span>
              <ChevronIcon isOpen={openMenu.transaction} />
            </button>

            {openMenu.transaction && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  to="/transaction/tagihan"
                  className={`block px-4 py-2 rounded-lg text-sm ${isActive("/transaction/tagihan")}`}
                >
                  Tagihan
                </Link>
                <Link
                  to="/transaction/pengeluaran"
                  className={`block px-4 py-2 rounded-lg text-sm ${isActive("/transaction/pengeluaran")}`}
                >
                  Pengeluaran
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => toggleMenu("report")}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="font-bold uppercase text-xs tracking-wider">
                Laporan
              </span>
              <ChevronIcon isOpen={openMenu.report} />
            </button>

            {openMenu.report && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  to="/report/laporan"
                  className={`block px-4 py-2 rounded-lg text-sm ${isActive("/report/laporan")}`}
                >
                  Laporan Keuangan
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
