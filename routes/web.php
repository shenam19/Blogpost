<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
// Route::resource('posts', PostController::class)->middleware('auth');

Route::resource('posts', PostController::class)->middleware('auth')->except(['edit', 'update', 'destroy']);

Route::middleware(['auth'])->group(function () {
    Route::get('posts/{post}/edit', [PostController::class, 'edit'])
        ->name('posts.edit')
        ->middleware('can:update,post');
    Route::put('posts/{post}', [PostController::class, 'update'])
        ->name('posts.update')
        ->middleware('can:update,post');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])
        ->name('posts.destroy')
        ->middleware('can:delete,post');
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
