import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rumah from "./pages/Master/Rumah";
import Penghuni from "./pages/Master/Penghuni";
import Tagihan from "./pages/Transaction/Tagihan";
import Pengeluaran from "./pages/Transaction/Pengeluaran";
import Laporan from "./pages/Report/Laporan";

const ProtectedRoute = ({ children }) =>
  localStorage.getItem("token") ? children : <Navigate to="/login" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="master/rumah" element={<Rumah />} />
          <Route path="master/penghuni" element={<Penghuni />} />
          <Route path="transaction/tagihan" element={<Tagihan />} />
          <Route path="transaction/pengeluaran" element={<Pengeluaran />} />
          <Route path="report/laporan" element={<Laporan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
