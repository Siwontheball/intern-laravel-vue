<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemoController;

Route::post('/memo', [MemoController::class, 'store'])->name('memos.store');
Route::get('/memo', [MemoController::class, 'index'])->name('memos.index');
Route::delete('memo/{id}', [MemoController::class, 'destroy'])->name('memos.destroy');
