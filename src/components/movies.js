'use client'

import Image from "next/image";
import { useState } from "react";
import { movies } from "@/database/dummy";

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
                                    src={imgUrl}
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
