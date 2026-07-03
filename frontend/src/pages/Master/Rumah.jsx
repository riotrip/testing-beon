import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";

import AddModal from "../../components/Rumah/AddModal";
import EditModal from "../../components/Rumah/EditModal";
import DetailModal from "../../components/Rumah/DetailModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Toast from "../../components/common/Toast";

export default function Rumah() {
  const [rumah, setRumah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    no_rumah: "",
    address: "",
    status: "Tidak Dihuni",
  });

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRumah, setSelectedRumah] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const triggerSuccess = (message) => {
    setSuccessMsg(message);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setSuccessMsg("");
    }, 2500);
  };

  const fetchRumah = useCallback(async () => {
    setLoading(true);  
    try {
      const res = await api.get("/rumah");
      setRumah(res.data.data || res.data);
      setError(null);
    } catch {
      setError("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/rumah");
        if (isMounted) {
          setRumah(res.data.data || res.data);
          setError(null);
        }
      } catch {
        if (isMounted) setError("Gagal memuat data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewDetail = async (item) => {
    setSelectedRumah(item);
    setShowDetailModal(true);
    setLoadingDetail(true);
    try {
      const res = await api.get(`/rumah/${item.id}`);
      setSelectedRumah(res.data.data || res.data);
    } catch {
      // Error handling opsional
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/rumah/${editId}`, formData);
        triggerSuccess("Data diperbarui!");
      } else {
        await api.post("/rumah", formData);
        triggerSuccess("Data ditambahkan!");
      }
      setShowModal(false);
      fetchRumah();
    } catch (err) {
      if (err.response?.status === 422) {
        alert("Validasi gagal, cek inputan Anda.");
      } else {
        alert("Terjadi kesalahan.");
      }
    }
  };

  const executeDelete = async () => {
    try {
      await api.delete(`/rumah/${deleteTarget.id}`);
      setRumah(rumah.filter((i) => i.id !== deleteTarget.id));
      setShowDeleteModal(false);
      triggerSuccess("Data dihapus!");
    } catch {
      alert("Gagal menghapus.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Rumah</h1>
        <button
          onClick={() => {
            setEditId(null);
            setFormData({ no_rumah: "", address: "", status: "Tidak Dihuni" });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Tambah
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-slate-500 font-semibold">
            Memuat...
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-500 font-semibold">
            {error}
          </div>
        )}
        {!loading && !error && (
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  Nomor
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rumah.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-800">
                    Blok {item.no_rumah}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{item.address}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                        item.status === "Dihuni"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleViewDetail(item)}
                      className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-medium transition-colors text-sm"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setFormData(item);
                        setShowModal(true);
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(item);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddModal
        isOpen={showModal && !editId}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      <EditModal
        isOpen={showModal && !!editId}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        selectedRumah={selectedRumah}
        loadingDetail={loadingDetail}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={executeDelete}
        title="Hapus Data?"
        message="Data tidak dapat dikembalikan."
      />
      <Toast isOpen={showSuccessToast} message={successMsg} />
    </div>
  );
}
