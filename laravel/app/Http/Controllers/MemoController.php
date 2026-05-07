<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Memo;

class MemoController extends Controller
{
    // メモ一覧の取得
    public function index(Request $request)
    {
        // ログインユーザーに紐付くメモだけを最新順で取得
        $user = $request->user();
        if (! $user) {
            return response()->json([], 200);
        }

        $memos = $user->memos()->latest()->get();
        return response()->json($memos);
    }

    // メモの保存
    public function store(Request $request)
    {
        // バリデーション（不正なデータが保存されるのを防ぐ）
        $validated = $request->validate([
            'content' => 'required|string|max:1000', // カラム名に合わせて適宜変更
        ]);

        $user = $request->user();
        if (! $user) {
            return response()->json(null, 401);
        }

        $memo = $user->memos()->create([
            'memo' => $validated['content'],
        ]);

        return response()->json($memo->fresh());
    }

    // メモの削除
    public function destroy(Request $request, $id)
    {
        // 重要：Memo::find($id) ではなく、現在のユーザーのメモの中から探す
        // これにより、他人のメモIDを指定されても404エラーになり、削除を防止できる
        $user = $request->user();
        if (! $user) {
            return response()->json(null, 401);
        }

        $memo = $user->memos()->findOrFail($id);

        $memo->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
