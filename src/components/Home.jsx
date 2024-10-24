import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 flex flex-col justify-center items-center">
            <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">Selamat Datang di Halaman Home</h1>
                <p className="text-lg text-gray-700 mb-8">Created by Reizan</p>
                
            </div>
        </div>
    );
}
