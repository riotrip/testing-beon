<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Penghuni;
use App\Models\Rumah;

class PenghuniSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penghuni1 = Penghuni::create([
            'name' => 'Budi Santoso',
            'foto_ktp' => 'dummy_ktp_budi.jpg',
            'status' => 'Tetap',
            'no_hp' => '081234567890',
            'is_married' => true,
        ]);

        $penghuni2 = Penghuni::create([
            'name' => 'Siti Aminah',
            'foto_ktp' => 'dummy_ktp_siti.jpg',
            'status' => 'Kontrak',
            'no_hp' => '089876543210',
            'is_married' => false,
        ]);

        $rumah1 = Rumah::where('no_rumah', 'A-01')->first();
        if ($rumah1) {
            $rumah1->penghunis()->attach($penghuni1->id, ['tgl_masuk' => '2026-01-01', 'tgl_keluar' => null]);
            $rumah1->update(['status' => 'Dihuni']);
        }

        $rumah2 = Rumah::where('no_rumah', 'A-02')->first();
        if ($rumah2) {
            $rumah2->penghunis()->attach($penghuni2->id, ['tgl_masuk' => '2026-02-01', 'tgl_keluar' => null]);
            $rumah2->update(['status' => 'Dihuni']);
        }
    }
}
