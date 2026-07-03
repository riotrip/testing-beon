<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Penghuni extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'foto_ktp',
        'status',
        'no_hp',
        'is_married',
    ];

    public function rumahs()
    {
        return $this->belongsToMany(Rumah::class, 'historis_menghuni', 'penghuni_id', 'rumah_id')
            ->withPivot('tgl_masuk', 'tgl_keluar')
            ->withTimestamps();
    }

    // Hanya rumah yang sedang aktif dihuni sekarang
    public function rumahAktif()
    {
        return $this->belongsToMany(Rumah::class, 'historis_menghuni', 'penghuni_id', 'rumah_id')
            ->wherePivotNull('tgl_keluar')
            ->withPivot('tgl_masuk')
            ->limit(1);
    }
}