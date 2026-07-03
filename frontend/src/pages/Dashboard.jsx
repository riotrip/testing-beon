import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_rumah: 0,
    total_penghuni: 0,
    saldo_kas: 0,
    tagihan_pending: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(
          res.data.data || {
            total_rumah: 0,
            total_penghuni: 0,
            saldo_kas: 0,
            tagihan_pending: 0,
          },
        );
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard RT</h1>
        <p className="text-slate-500">Ringkasan aktivitas lingkungan Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">
            Total Rumah
          </p>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-2">
            {stats.total_rumah}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">
            Total Warga
          </p>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-2">
            {stats.total_penghuni}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">
            Saldo Kas
          </p>
          <h2 className="text-2xl font-extrabold text-blue-600 mt-2">
            Rp {stats.saldo_kas.toLocaleString("id-ID")}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">
            Tagihan Pending
          </p>
          <h2 className="text-3xl font-extrabold text-amber-600 mt-2">
            {stats.tagihan_pending}
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Aktivitas Terkini</h3>
        <p className="text-slate-500 italic text-sm">
          Belum ada aktivitas terbaru.
        </p>
      </div>
    </div>
  );
}
