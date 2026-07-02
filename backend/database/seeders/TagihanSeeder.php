<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tagihan;
use App\Models\Rumah;
use Carbon\Carbon;

class TagihanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rumah1 = Rumah::where('no_rumah', 'A-01')->first();
        $rumah2 = Rumah::where('no_rumah', 'A-02')->first();

        if ($rumah1) {
            for ($bulan = 1; $bulan <= 6; $bulan++) {
                Tagihan::create(['rumah_id' => $rumah1->id, 'type' => 'Kebersihan', 'amount' => 15000, 'bulan_tagihan' => $bulan, 'tahun_tagihan' => 2026, 'payment_status' => 'Lunas', 'payment_date' => Carbon::create(2026, $bulan, 5)->toDateString()]);
                Tagihan::create(['rumah_id' => $rumah1->id, 'type' => 'Satpam', 'amount' => 100000, 'bulan_tagihan' => $bulan, 'tahun_tagihan' => 2026, 'payment_status' => 'Lunas', 'payment_date' => Carbon::create(2026, $bulan, 5)->toDateString()]);
            }
        }

        if ($rumah2) {
            Tagihan::create(['rumah_id' => $rumah2->id, 'type' => 'Kebersihan', 'amount' => 15000, 'bulan_tagihan' => 2, 'tahun_tagihan' => 2026, 'payment_status' => 'Lunas', 'payment_date' => '2026-02-10']);
            Tagihan::create(['rumah_id' => $rumah2->id, 'type' => 'Satpam', 'amount' => 100000, 'bulan_tagihan' => 2, 'tahun_tagihan' => 2026, 'payment_status' => 'Lunas', 'payment_date' => '2026-02-10']);
            Tagihan::create(['rumah_id' => $rumah2->id, 'type' => 'Kebersihan', 'amount' => 15000, 'bulan_tagihan' => 3, 'tahun_tagihan' => 2026, 'payment_status' => 'Belum Lunas', 'payment_date' => null]);
        }
    }
}
