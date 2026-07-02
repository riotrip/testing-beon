<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rumah;

class RumahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rumahs = Rumah::with('penghunis')->get();
        return response()->json($rumahs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_rumah' => 'required|string|unique:rumahs,no_rumah',
            'address' => 'required|string',
            'status' => 'required|in:Dihuni,Tidak Dihuni'
        ]);

        $rumah = Rumah::create($validated);

        return response()->json([
            'message' => 'Data rumah berhasil ditambahkan',
            'data' => $rumah
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rumah = Rumah::with(['penghunis', 'tagihans'])->findOrFail($id);

        return response()->json([
            'message' => 'Detail rumah berhasil diambil',
            'data' => $rumah
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rumah = Rumah::findOrFail($id);

        $validated = $request->validate([
            'no_rumah' => 'required|string|unique:rumahs,no_rumah,' . $id,
            'address' => 'required|string',
            'status' => 'required|in:Dihuni,Tidak Dihuni'
        ]);

        $rumah->update($validated);

        return response()->json([
            'message' => 'Data rumah berhasil diupdate',
            'data' => $rumah
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rumah = Rumah::findOrFail($id);
        $rumah->delete();

        return response()->json(['message' => 'Data rumah berhasil dihapus']);
    }

    public function addPenghuni(Request $request, string $id)
    {
        $rumah = Rumah::findOrFail($id);

        $validated = $request->validate([
            'penghuni_id' => 'required|exists:penghunis,id',
            'tgl_masuk' => 'required|date',
        ]);

        $rumah->penghunis()->attach($validated['penghuni_id'], [
            'tgl_masuk' => $validated['tgl_masuk'],
            'tgl_keluar' => null
        ]);

        $rumah->update(['status' => 'Dihuni']);

        return response()->json([
            'message' => 'Penghuni berhasil ditambahkan ke rumah ini',
            'data' => $rumah->load('penghunis')
        ]);
    }
}
