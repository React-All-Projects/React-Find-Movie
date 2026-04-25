import Title from "@/components/title"
import Movies from "@/components/movies";

export default function SearchPages(){
    const propsComponent = {
        movieImg : 'https://images.unsplash.com/photo-1606603696914-a0f46d934b9c?q=80&w=1564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }

    return(
        <div className="mx-auto mt-6 w-[92%] max-w-6xl rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/20">
            <Title textTitle='Cari Movie Anda' />
            <Movies imgUrl={propsComponent.movieImg}/>
        </div>
    );
}
