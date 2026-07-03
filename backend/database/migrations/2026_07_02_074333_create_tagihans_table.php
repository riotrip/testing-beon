<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tagihans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');
            $table->string('type', 50);
            $table->integer('amount');
            $table->integer('bulan_tagihan');
            $table->integer('tahun_tagihan');
            $table->enum('payment_status', ['Lunas', 'Belum Lunas'])->default('Belum Lunas');
            $table->date('payment_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihans');
    }
};
