export default function DetailModal({
  isOpen,
  onClose,
  detailData,
  loading,
  periode,
}) {
  if (!isOpen) return null;

  const namaBulan = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-indigo-600 text-white">
          <h3 className="text-lg font-bold">
            Rincian Transaksi - {namaBulan[periode.bulan]} {periode.tahun}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-500 font-semibold">
              Memuat rincian transaksi...
            </div>
          ) : (
            <>
              <div>
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-emerald-600">
                  Pemasukan (Tagihan Lunas)
                </h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-emerald-50 border-b border-slate-200">
                        <th className="px-4 py-3 font-bold text-slate-600">
                          Rumah
                        </th>
                        <th className="px-4 py-3 font-bold text-slate-600">
                          Jenis Iuran
                        </th>
                        <th className="px-4 py-3 font-bold text-slate-600">
                          Tanggal Bayar
                        </th>
                        <th className="px-4 py-3 font-bold text-slate-600 text-right">
                          Nominal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {detailData.pemasukan?.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-bold text-slate-800">
                            Blok {item.rumah?.no_rumah}
                          </td>
                          <td className="px-4 py-3 text-slate-700">
                            {item.type}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {new Date(item.payment_date).toLocaleDateString(
                              "id-ID",
                            )}
                          </td>
                          <td className="px-4 py-3 font-bold text-emerald-600 text-right">
                            Rp {Number(item.amount).toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-red-600">
                  Pengeluaran Operasional
                </h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-red-50 border-b border-slate-200">
                        <th className="px-4 py-3 font-bold text-slate-600">
                          Tanggal
                        </th>
                        <th className="px-4 py-3 font-bold text-slate-600">
                          Kategori
                        </th>
                        <th className="px-4 py-3 font-bold text-slate-600">
                          Deskripsi
                        </th>
                        <th className="px-4 py-3 font-bold text-slate-600 text-right">
                          Nominal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {detailData.pengeluaran?.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-600">
                            {new Date(item.date).toLocaleDateString("id-ID")}
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-700">
                            {item.category}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {item.description}
                          </td>
                          <td className="px-4 py-3 font-bold text-red-600 text-right">
                            Rp {Number(item.amount).toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
