'use client'
import Image from "next/image"

export default function Jumbotron(props) {
  return (
    <div className="relative w-full h-96">
      <Image 
        src={props.url}
        alt="Jumbotron Movie"
        className="object-cover rounded-b-2xl"
        fill
        sizes="100vw"
      />

      <div className="absolute inset-0 flex items-center justify-center px-4 c">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
          {props.content}
        </h1>
      </div>
    </div>
  );
}
