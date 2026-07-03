export default function DetailModal({
  isOpen,
  onClose,
  selectedRumah,
  loadingDetail,
}) {
  if (!isOpen || !selectedRumah) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-sky-500 text-white">
          <div>
            <h3 className="text-lg font-bold">
              Detail & Riwayat Rumah Blok {selectedRumah.no_rumah}
            </h3>
            <p className="text-sm text-sky-100 mt-1">
              {selectedRumah.address || "Alamat belum tercatat"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-4 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Status Saat Ini
            </span>
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${
                selectedRumah.status === "Dihuni"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {selectedRumah.status || "Tidak Dihuni"}
            </span>
          </div>

          <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
            Historis Penghuni
          </h4>

          {loadingDetail ? (
            <div className="py-8 text-center text-slate-500 font-semibold">
              Memuat riwayat...
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 font-bold text-slate-600">
                      Nama Lengkap
                    </th>
                    <th className="px-4 py-3 font-bold text-slate-600">
                      Status Warga
                    </th>
                    <th className="px-4 py-3 font-bold text-slate-600">
                      Periode Masuk
                    </th>
                    <th className="px-4 py-3 font-bold text-slate-600">
                      Periode Keluar
                    </th>
                    <th className="px-4 py-3 font-bold text-slate-600 text-center">
                      Kondisi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedRumah.penghunis &&
                  selectedRumah.penghunis.length > 0 ? (
                    selectedRumah.penghunis.map((p, idx) => {
                      const tglMasuk = p.pivot?.tgl_masuk || p.tgl_masuk;
                      const tglKeluar = p.pivot?.tgl_keluar || p.tgl_keluar;
                      const isAktif = !tglKeluar;

                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">
                            {p.nama_lengkap || p.nama}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 text-xs rounded font-semibold bg-blue-100 text-blue-700">
                              {p.status_kependudukan || "Kontrak"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {tglMasuk
                              ? new Date(tglMasuk).toLocaleDateString("id-ID")
                              : "-"}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {tglKeluar ? (
                              new Date(tglKeluar).toLocaleDateString("id-ID")
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                                isAktif
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {isAktif ? "Aktif Menempati" : "Pindah/Keluar"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-6 text-center text-slate-500 italic"
                      >
                        Belum ada riwayat penghuni yang tercatat di rumah ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
