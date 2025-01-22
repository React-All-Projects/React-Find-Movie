'use client'
import Link from "next/link";

export default function Title({textTitle}){
    return(
        <div className="rounded-t-2xl bg-gray-800 p-5 flex flex-row">
            <Link href='/' className="text-xs flex-1">BackHome</Link>
            <h2 className="flex-auto">
                {textTitle}
            </h2>
        </div>
        
    );
}