<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghuni extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'foto_ktp',
        'status',
        'no_hp',
        'is_married',
    ];

    public function rumahs()
    {
        return $this->belongsToMany(Rumah::class, 'historis_menghuni')
                    ->withPivot('tgl_masuk', 'tgl_keluar')
                    ->withTimestamps();
    }
}