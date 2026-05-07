<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    //
    protected $fillable = ['user_id', 'memo'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
