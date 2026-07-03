<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rumah;
use App\Models\Penghuni;
use App\Models\Tagihan;
use App\Models\Pengeluaran;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $totalRumah = Rumah::count();
            $totalPenghuni = Penghuni::count();

            $tahun = date('Y');
            $totalPemasukan = 0;
            $totalPengeluaran = 0;

            for ($bulan = 1; $bulan <= 12; $bulan++) {
                $pemasukan = Tagihan::where('payment_status', 'Lunas')
                    ->where('bulan_tagihan', $bulan)
                    ->where('tahun_tagihan', $tahun)
                    ->sum('amount');

                $pengeluaran = Pengeluaran::whereMonth('date', $bulan)
                    ->whereYear('date', $tahun)
                    ->sum('amount');

                $totalPemasukan += $pemasukan;
                $totalPengeluaran += $pengeluaran;
            }

            $saldoKas = $totalPemasukan - $totalPengeluaran;

            $tagihanPending = Tagihan::where('payment_status', 'Belum Bayar')->count();

            return response()->json([
                'message' => 'Dashboard data berhasil diambil',
                'data' => [
                    'total_rumah' => $totalRumah,
                    'total_penghuni' => $totalPenghuni,
                    'saldo_kas' => $saldoKas,
                    'tagihan_pending' => $tagihanPending,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal memuat data dashboard',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
