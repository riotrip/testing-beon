<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tagihan extends Model
{
    use HasFactory;

    protected $fillable = [
        'rumah_id',
        'type',
        'amount',
        'bulan_tagihan',
        'tahun_tagihan',
        'payment_status',
        'payment_date',
    ];

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
}