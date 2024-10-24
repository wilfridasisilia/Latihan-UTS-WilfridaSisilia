<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

// Contoh route API
Route::get('/books', [BookController::class, 'index']); // Mendapatkan semua buku
Route::post('/books', [BookController::class, 'store']); // Menambah buku baru
Route::get('/books/{book}', [BookController::class, 'show']); // Mendapatkan buku berdasarkan ID
Route::put('/books/{book}', [BookController::class, 'update']); // Memperbarui buku
Route::delete('/books/{book}', [BookController::class, 'destroy']); // Menghapus buku

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
