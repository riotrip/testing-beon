<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RumahController;
use App\Http\Controllers\Api\PenghuniController;
use App\Http\Controllers\Api\TagihanController;
use App\Http\Controllers\Api\PengeluaranController;
use App\Http\Controllers\Api\LaporanController;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('rumah', RumahController::class);
    Route::apiResource('penghuni', PenghuniController::class);
    Route::apiResource('tagihan', TagihanController::class);
    Route::apiResource('pengeluaran', PengeluaranController::class);

    Route::post('rumah/{rumah}/tambah-penghuni', [RumahController::class, 'addPenghuni']);

    Route::get('laporan/summary', [LaporanController::class, 'summaryTahunan']);
    Route::get('laporan/detail', [LaporanController::class, 'detailBulanan']);
});