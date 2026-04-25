'use client'

import Image from "next/image";
import { useState } from "react";
import { movies } from "@/database/dummy";

const posterPalettes = [
    ["0f172a", "e2e8f0"],
    ["172554", "bfdbfe"],
    ["3f1d2e", "fbcfe8"],
    ["3b0764", "e9d5ff"],
    ["1f2937", "fde68a"],
];

function escapeSvgText(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function splitTitle(title) {
    const words = title.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
        const candidate = currentLine ? `${currentLine} ${word}` : word;

        if (candidate.length <= 14) {
            currentLine = candidate;
            return;
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        currentLine = word;
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines.slice(0, 4);
}

function getPosterDataUrl(movie) {
    const [backgroundColor, textColor] = posterPalettes[movie.id % posterPalettes.length];
    const titleLines = splitTitle(movie.title);
    const titleMarkup = titleLines
        .map(
            (line, index) =>
                `<text x="36" y="${180 + index * 48}" fill="#${textColor}" font-size="34" font-weight="700" font-family="Arial, sans-serif">${escapeSvgText(line)}</text>`
        )
        .join("");

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#${backgroundColor}" />
                    <stop offset="100%" stop-color="#020617" />
                </linearGradient>
            </defs>
            <rect width="400" height="600" rx="32" fill="url(#bg)" />
            <rect x="28" y="28" width="344" height="544" rx="24" fill="none" stroke="rgba(255,255,255,0.18)" />
            <text x="36" y="88" fill="#7dd3fc" font-size="20" letter-spacing="6" font-family="Arial, sans-serif">MOVIE</text>
            ${titleMarkup}
            <text x="36" y="500" fill="#cbd5e1" font-size="22" font-family="Arial, sans-serif">${escapeSvgText(movie.genre.join(" • "))}</text>
            <text x="36" y="540" fill="#ffffff" font-size="28" font-weight="700" font-family="Arial, sans-serif">${movie.year}</text>
        </svg>
    `.trim();

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getPosterUrl(movie) {
    const posterUrl = movie.posterURL?.trim();

    if (posterUrl && !posterUrl.includes("via.placeholder.com")) {
        return posterUrl;
    }

    return getPosterDataUrl(movie);
}

export default function Movies({ imgUrl }) {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(movies[0]?.id ?? null);

    const normalizedQuery = query.trim().toLowerCase();
    const filteredMovies = movies.filter((movie) => {
        if (!normalizedQuery) {
            return true;
        }

        const searchableText = [
            movie.title,
            movie.genre.join(" "),
            movie.year,
            movie.description,
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(normalizedQuery);
    });

    const selectedMovie =
        filteredMovies.find((movie) => movie.id === selectedId) ??
        filteredMovies[0] ??
        null;

    const posterSrc = selectedMovie ? getPosterUrl(selectedMovie) : imgUrl;

    return (
        <div className="flex flex-col gap-4 rounded-b-3xl bg-slate-950/40 p-4 md:p-6 lg:flex-row lg:items-start">
            <section className="flex w-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 lg:w-[42%]">
                <div className="border-b border-white/10 p-4">
                    <label htmlFor="movie-search" className="mb-2 block text-sm font-medium text-slate-200">
                        Cari berdasarkan judul, genre, tahun, atau deskripsi
                    </label>
                    <input
                        id="movie-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Contoh: inception, drama, 2019..."
                        className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
                    />
                    <p className="mt-3 text-xs text-slate-400">
                        Menampilkan {filteredMovies.length} dari {movies.length} film
                    </p>
                </div>

                <div className="max-h-[320px] overflow-y-auto md:max-h-[420px] lg:max-h-[540px]">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => {
                            const isActive = selectedMovie?.id === movie.id;

                            return (
                                <button
                                    key={movie.id}
                                    type="button"
                                    onClick={() => setSelectedId(movie.id)}
                                    className={`w-full border-b border-white/5 px-4 py-4 text-left transition last:border-b-0 ${
                                        isActive
                                            ? "bg-sky-500/20 text-white"
                                            : "text-slate-200 hover:bg-slate-800/80"
                                    }`}
                                >
                                    <p className="font-semibold">{movie.title}</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {movie.genre.join(", ")} • {movie.year}
                                    </p>
                                </button>
                            );
                        })
                    ) : (
                        <div className="px-4 py-10 text-center text-sm text-slate-300">
                            Film yang cocok tidak ditemukan. Coba kata kunci lain.
                        </div>
                    )}
                </div>
            </section>

            <section className="w-full rounded-3xl border border-white/10 bg-slate-900/70 lg:min-h-[620px] lg:flex-1">
                {selectedMovie ? (
                    <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8 lg:p-8">
                        <div className="mx-auto w-full max-w-[220px]">
                            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
                                <Image
                                    src={posterSrc}
                                    alt={selectedMovie.title}
                                    fill
                                    sizes="(max-width: 1024px) 220px, 220px"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center text-slate-100">
                            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
                                Movie Detail
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold md:text-3xl">
                                {selectedMovie.title}
                            </h3>

                            <div className="mt-5 flex flex-wrap gap-2 text-sm">
                                {selectedMovie.genre.map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-100"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                                <p className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                                    Tahun Rilis: <span className="font-semibold text-white">{selectedMovie.year}</span>
                                </p>
                                <p className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                                    Rating: <span className="font-semibold text-white">★ {selectedMovie.rating}</span>
                                </p>
                            </div>

                            <p className="mt-6 leading-7 text-slate-300">
                                {selectedMovie.description}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex min-h-[260px] items-center justify-center px-6 py-12 text-center text-slate-300">
                        Pilih film dari daftar untuk melihat detailnya.
                    </div>
                )}
            </section>
        </div>
    );
}
