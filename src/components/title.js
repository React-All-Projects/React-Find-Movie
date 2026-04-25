'use client'
import Link from "next/link";

export default function Title({textTitle}){
    return(
        <div className="flex flex-col gap-3 rounded-t-3xl border-b border-white/10 bg-slate-950/80 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <Link
                href='/'
                className="inline-flex w-fit rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-sky-400/40 hover:text-sky-200"
            >
                Back Home
            </Link>
            <h2 className="text-xl font-semibold sm:text-2xl">
                {textTitle}
            </h2>
        </div>
        
    );
}
