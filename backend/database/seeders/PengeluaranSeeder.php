<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pengeluaran;

class PengeluaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pengeluaran::create(['description' => 'Perbaikan Lampu Jalan Blok A', 'category' => 'Infrastruktur', 'amount' => 120000, 'date' => '2026-02-20']);
        Pengeluaran::create(['description' => 'Gaji Satpam (Bulan Maret)', 'category' => 'Operasional', 'amount' => 1500000, 'date' => '2026-03-25']);
        Pengeluaran::create(['description' => 'Konsumsi Kerja Bakti', 'category' => 'Kebersihan', 'amount' => 250000, 'date' => '2026-04-10']);
    }
}
