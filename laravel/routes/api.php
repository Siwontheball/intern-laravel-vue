<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemoController;
use Illuminate\Http\Request;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/memo', [MemoController::class, 'store']);
    Route::get('/memo', [MemoController::class, 'index']);
    Route::delete('memo/{id}', [MemoController::class, 'destroy']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/profile', [ProfileController::class, 'update']);
});


