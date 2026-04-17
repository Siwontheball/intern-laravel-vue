<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Memo;

class MemoController extends Controller
{
    //
    public function store(Request $request){
        Memo::create([
            'memo' => $request['content'],
        ]);
    }
}
