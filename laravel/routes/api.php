<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemoController;

Route::post('/memo', [MemoController::class, 'store']);
Route::get('/memo', [MemoController::class, 'index']);
Route::delete('memo/{id}', [MemoController::class, 'destroy']);
