<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_rumah',
        'address',
        'status',
    ];

    public function tagihans()
    {
        return $this->hasMany(Tagihan::class);
    }

    public function penghunis()
    {
        return $this->belongsToMany(Penghuni::class, 'historis_menghuni')
                    ->withPivot('tgl_masuk', 'tgl_keluar')
                    ->withTimestamps();
    }
}