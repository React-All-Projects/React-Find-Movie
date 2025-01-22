'use client'
import { movies } from "@/database/dummy";
import { useState } from "react";
import Image from "next/image";

export default function Movies({imgUrl}){
    // State get Title Selected
    const [select, setSelect] = useState();

    // Function Event get Title & return all data
    const show = (e) =>{
        const getTitle = e.currentTarget.querySelector("p");
        const selectedTitle = getTitle ? getTitle.innerText : "";

        const selectedMovie = movies.find(movie => movie.title === selectedTitle);

        if (selectedMovie) {
            // console.log("Selected Movie:", selectedMovie); --debug
            setSelect(selectedMovie);
        }
        
    }
    // View
    return(
        <div className="flex flex-row h-[533px] rounded-b-2xl">

            {/* Section 1 */}
            <div className="list flex-auto w-[30%] overflow-auto rounded-b-2xl">
                {movies.map((movie)=>(
                    <div key={movie.id} className="p-5 hover:bg-sky-700" onClick={show}>
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>

            {/* Section 2 */}
            <div className="quickDetail flex-auto w-[30%]">
                {select ? (
                    <div className="p-10">
                        <Image 
                            src={imgUrl}
                            alt="Movie Image"
                            width='150'
                            height='250'
                            className="object-cover m-auto"
                        />
                        <h3 className="font-semibold text-lg pt-3 pb-5 text-center">{select.title}</h3>
                        <p className="pb-2">Genre : {select.genre.join(', ')}</p>
                        <p className="pb-2">Description: {select.description}</p>
                        <p>Rating : &#11088;{select.rating}</p>
                    </div>
                ) : (
                    <p className="text-center mt-60">Pilih Film Untuk Lihat Deskripsi</p>
                )}
            </div>
        </div>
    );
}
