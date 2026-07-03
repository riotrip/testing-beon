import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import DetailModal from "../../components/Laporan/DetailModal";

export default function Laporan() {
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState({
    pemasukan: [],
    pengeluaran: [],
  });
  const [selectedPeriode, setSelectedPeriode] = useState({
    bulan: 1,
    tahun: new Date().getFullYear(),
  });

  const fetchSummary = useCallback(async () => {
    const res = await api.get(`/laporan/summary?tahun=${tahun}`);
    setSummary(res.data.data || []);
  }, [tahun]);

  useEffect(() => {
    queueMicrotask(() => fetchSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDetail = async (bulan) => {
    setSelectedPeriode({ bulan, tahun });
    setShowDetailModal(true);
    setLoadingDetail(true);
    const res = await api.get(`/laporan/detail?bulan=${bulan}&tahun=${tahun}`);
    setDetailData(res.data.data || { pemasukan: [], pengeluaran: [] });
    setLoadingDetail(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Laporan Keuangan RT
        </h1>
        <input
          type="number"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="w-24 px-3 py-1.5 border rounded-lg font-bold"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                Bulan
              </th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-right">
                Pemasukan
              </th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-right">
                Pengeluaran
              </th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {summary.map((item) => (
              <tr
                key={item.bulan}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-800">
                  {item.nama_bulan}
                </td>
                <td className="px-6 py-4 text-right text-emerald-600 font-bold">
                  Rp {Number(item.pemasukan).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-right text-red-600 font-bold">
                  Rp {Number(item.pengeluaran).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleOpenDetail(item.bulan)}
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Rincian
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        detailData={detailData}
        loading={loadingDetail}
        periode={selectedPeriode}
      />
    </div>
  );
}
