'use client'

import Link from "next/link";

export default function Navbar({links, linkd}){
    return(
        <div className="w-full rounded-t-3xl border-b border-white/10 bg-slate-950/85 px-5 py-4 text-white">
            <ul className="flex flex-wrap items-center gap-3 text-sm font-medium">
                <li>
                    <Link href="/">{links}</Link>
                </li>
                <li>
                    <Link href="/search">{linkd}</Link>
                </li>
            </ul>
        </div>
    );
}
