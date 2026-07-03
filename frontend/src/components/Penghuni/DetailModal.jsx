export default function DetailModal({
  isOpen,
  onClose,
  selectedPenghuni,
  loadingDetail,
}) {
  if (!isOpen || !selectedPenghuni) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-sky-500 text-white">
          <div>
            <h3 className="text-lg font-bold">{selectedPenghuni.name}</h3>
            <p className="text-sm text-sky-100 mt-1">
              {selectedPenghuni.no_hp}
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
          {loadingDetail ? (
            <div className="py-8 text-center text-slate-500 font-semibold">
              Memuat...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Status
                  </span>
                  <span
                    className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${
                      selectedPenghuni.status === "Tetap"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {selectedPenghuni.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Status Pernikahan
                  </span>
                  <span
                    className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${
                      selectedPenghuni.is_married
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {selectedPenghuni.is_married ? "Menikah" : "Belum Menikah"}
                  </span>
                </div>
              </div>

              {selectedPenghuni.foto_ktp && (
                <div className="mb-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Foto KTP
                  </span>
                  <img
                    src={`http://localhost:8000/storage/${selectedPenghuni.foto_ktp}`}
                    alt="KTP"
                    className="max-w-xs rounded-lg shadow"
                  />
                </div>
              )}

              <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
                Riwayat Menghuni
              </h4>

              {selectedPenghuni.rumahs && selectedPenghuni.rumahs.length > 0 ? (
                <div className="space-y-3">
                  {selectedPenghuni.rumahs.map((rumah) => (
                    <div
                      key={rumah.id}
                      className="p-3 border border-slate-200 rounded-lg bg-slate-50"
                    >
                      <p className="font-bold text-slate-800">
                        Blok {rumah.no_rumah}
                      </p>
                      <p className="text-sm text-slate-600">{rumah.address}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        Masuk:{" "}
                        {new Date(rumah.pivot.tgl_masuk).toLocaleDateString(
                          "id-ID",
                        )}
                        {rumah.pivot.tgl_keluar
                          ? ` • Keluar: ${new Date(
                              rumah.pivot.tgl_keluar,
                            ).toLocaleDateString("id-ID")}`
                          : " • Masih Menghuni"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">
                  Belum memiliki riwayat menghuni
                </p>
              )}
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
