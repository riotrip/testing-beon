<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tagihan;

class TagihanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tagihans = Tagihan::with('rumah')->get();
        return response()->json($tagihans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rumah_id' => 'required|exists:rumahs,id',
            'type' => 'required|in:Satpam,Kebersihan',
            'amount' => 'required|integer',
            'bulan_mulai' => 'required|integer|min:1|max:12',
            'tahun_mulai' => 'required|integer',
            'jumlah_bulan' => 'required|integer|min:1',
            'payment_status' => 'required|in:Lunas,Belum Lunas'
        ]);

        $bulanSekarang = $validated['bulan_mulai'];
        $tahunSekarang = $validated['tahun_mulai'];
        
        $paymentDate = $validated['payment_status'] === 'Lunas' ? now()->toDateString() : null;

        $insertedData = [];

        for ($i = 0; $i < $validated['jumlah_bulan']; $i++) {
            $insertedData[] = Tagihan::create([
                'rumah_id' => $validated['rumah_id'],
                'type' => $validated['type'],
                'amount' => $validated['amount'],
                'bulan_tagihan' => $bulanSekarang,
                'tahun_tagihan' => $tahunSekarang,
                'payment_status' => $validated['payment_status'],
                'payment_date' => $paymentDate,
            ]);

            $bulanSekarang++;
            
            if ($bulanSekarang > 12) {
                $bulanSekarang = 1;
                $tahunSekarang++;
            }
        }

        return response()->json([
            'message' => 'Berhasil mencatat ' . $validated['jumlah_bulan'] . ' bulan pembayaran.',
            'data' => $insertedData
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tagihan = Tagihan::with('rumah')->findOrFail($id);
        
        return response()->json([
            'message' => 'Detail tagihan berhasil diambil',
            'data' => $tagihan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tagihan = Tagihan::findOrFail($id);
        
        $validated = $request->validate([
            'payment_status' => 'required|in:Lunas,Belum Lunas'
        ]);

        $tagihan->payment_status = $validated['payment_status'];
        
        if ($validated['payment_status'] === 'Lunas') {
            $tagihan->payment_date = now()->toDateString();
        } else {
            $tagihan->payment_date = null;
        }

        $tagihan->save();

        return response()->json([
            'message' => 'Status tagihan berhasil diupdate',
            'data' => $tagihan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tagihan = Tagihan::findOrFail($id);
        $tagihan->delete();

        return response()->json(['message' => 'Tagihan berhasil dihapus']);
    }
}
