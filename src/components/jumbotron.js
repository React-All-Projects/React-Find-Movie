'use client'
import Image from "next/image"

export default function Jumbotron(props) {
  return (
    <div className="relative min-h-[340px] w-full overflow-hidden rounded-b-3xl md:min-h-[420px]">
      <Image 
        src={props.url}
        alt="Jumbotron Movie"
        className="object-cover"
        fill
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          {props.content}
        </h1>
      </div>
    </div>
  );
}
