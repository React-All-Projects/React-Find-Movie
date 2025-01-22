'use client'

import Link from "next/link";

export default function Navbar({links, linkd}){
    return(
        <div className="w-full bg-black rounded-t-2xl">
            <ul>
                <li className="inline-block m-5 mr-10">
                    <Link href="/">{links}</Link>
                </li>
                <li className="inline-block">
                    <Link href="/search">{linkd}</Link>
                </li>
            </ul>
        </div>
    );
}