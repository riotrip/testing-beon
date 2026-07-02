<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Penghuni;
use Illuminate\Support\Facades\Storage;

class PenghuniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penghunis = Penghuni::all();
        return response()->json($penghunis);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'foto_ktp' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required|in:Tetap,Kontrak',
            'no_hp' => 'required|string|max:20',
            'is_married' => 'required|boolean',
        ]);

        if ($request->hasFile('foto_ktp')) {
            $path = $request->file('foto_ktp')->store('ktp_images', 'public');
            $validated['foto_ktp'] = $path;
        }

        $penghuni = Penghuni::create($validated);

        return response()->json([
            'message' => 'Data penghuni berhasil ditambahkan',
            'data' => $penghuni
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penghuni = Penghuni::with('rumahs')->findOrFail($id);
        
        return response()->json([
            'message' => 'Detail penghuni berhasil diambil',
            'data' => $penghuni
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $penghuni = Penghuni::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'foto_ktp' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required|in:Tetap,Kontrak',
            'no_hp' => 'required|string|max:20',
            'is_married' => 'required|boolean',
        ]);

        if ($request->hasFile('foto_ktp')) {
            if ($penghuni->foto_ktp && Storage::disk('public')->exists($penghuni->foto_ktp)) {
                Storage::disk('public')->delete($penghuni->foto_ktp);
            }
            $path = $request->file('foto_ktp')->store('ktp_images', 'public');
            $validated['foto_ktp'] = $path;
        } else {
            unset($validated['foto_ktp']); 
        }

        $penghuni->update($validated);

        return response()->json([
            'message' => 'Data penghuni berhasil diupdate',
            'data' => $penghuni
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penghuni = Penghuni::findOrFail($id);

        if ($penghuni->foto_ktp && Storage::disk('public')->exists($penghuni->foto_ktp)) {
            Storage::disk('public')->delete($penghuni->foto_ktp);
        }

        $penghuni->delete();

        return response()->json(['message' => 'Data penghuni berhasil dihapus']);
    }
}
