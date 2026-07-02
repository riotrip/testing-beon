<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tagihan;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function summaryTahunan(Request $request)
    {
        $tahun = $request->query('tahun', date('Y'));

        $summary = [];

        for ($bulan = 1; $bulan <= 12; $bulan++) {
            $pemasukan = Tagihan::where('payment_status', 'Lunas')
                ->where('bulan_tagihan', $bulan)
                ->where('tahun_tagihan', $tahun)
                ->sum('amount');

            $pengeluaran = Pengeluaran::whereMonth('date', $bulan)
                ->whereYear('date', $tahun)
                ->sum('amount');

            $summary[] = [
                'bulan' => $bulan,
                'nama_bulan' => date('F', mktime(0, 0, 0, $bulan, 10)),
                'pemasukan' => (int) $pemasukan,
                'pengeluaran' => (int) $pengeluaran,
                'saldo_sisa' => (int) ($pemasukan - $pengeluaran)
            ];
        }

        return response()->json([
            'message' => "Summary laporan keuangan tahun $tahun",
            'tahun' => $tahun,
            'data' => $summary
        ]);
    }

    public function detailBulanan(Request $request)
    {
        $request->validate([
            'bulan' => 'required|integer|min:1|max:12',
            'tahun' => 'required|integer',
        ]);

        $bulan = $request->bulan;
        $tahun = $request->tahun;

        $rincianPemasukan = Tagihan::with('rumah')
            ->where('payment_status', 'Lunas')
            ->where('bulan_tagihan', $bulan)
            ->where('tahun_tagihan', $tahun)
            ->get();

        $rincianPengeluaran = Pengeluaran::whereMonth('date', $bulan)
            ->whereYear('date', $tahun)
            ->get();

        return response()->json([
            'message' => "Detail transaksi bulan $bulan tahun $tahun",
            'periode' => [
                'bulan' => $bulan,
                'tahun' => $tahun
            ],
            'data' => [
                'pemasukan' => $rincianPemasukan,
                'pengeluaran' => $rincianPengeluaran
            ]
        ]);
    }
}