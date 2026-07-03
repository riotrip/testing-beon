<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengeluaran;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengeluarans = Pengeluaran::orderBy('date', 'desc')->get();
        return response()->json([
            'message' => 'Daftar pengeluaran berhasil diambil',
            'data' => $pengeluarans
        ]);
    }

    /**
     * Store a newly created resource in storage.
    */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'date' => 'required|date',
        ]);

        $pengeluaran = Pengeluaran::create($validated);

        return response()->json([
            'message' => 'Data pengeluaran berhasil dicatat',
            'data' => $pengeluaran
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pengeluaran = Pengeluaran::findOrFail($id);
        return response()->json($pengeluaran);
    }

    /**
     * Update the specified resource in storage.
    */
    public function update(Request $request, string $id)
    {
        $pengeluaran = Pengeluaran::findOrFail($id);

        $validated = $request->validate([
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'date' => 'required|date',
        ]);

        $pengeluaran->update($validated);

        return response()->json([
            'message' => 'Data pengeluaran berhasil diupdate',
            'data' => $pengeluaran
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pengeluaran = Pengeluaran::findOrFail($id);
        $pengeluaran->delete();

        return response()->json(['message' => 'Data pengeluaran berhasil dihapus']);
    }
}
