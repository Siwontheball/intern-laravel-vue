<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';
/**
 * SPAのルーティングを全て受け取る
 */
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

