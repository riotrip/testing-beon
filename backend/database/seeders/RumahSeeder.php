<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rumah;

class RumahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rumah::create(['no_rumah' => 'A-01', 'address' => 'Blok A No. 1', 'status' => 'Tidak Dihuni']);
        Rumah::create(['no_rumah' => 'A-02', 'address' => 'Blok A No. 2', 'status' => 'Tidak Dihuni']);
        Rumah::create(['no_rumah' => 'B-01', 'address' => 'Blok B No. 1', 'status' => 'Tidak Dihuni']);
    }
}
