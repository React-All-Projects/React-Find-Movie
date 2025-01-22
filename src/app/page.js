import Navbar from "@/components/navbar";
import Jumbotron from "@/components/jumbotron";

export default function Home() {
  
  //Component Props
  const propsComponent = {
    linkNames: 'Home',
    linkNamed: 'Search',
    urlImage: 'https://images.unsplash.com/photo-1717295248494-937c3a5655b1?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    contentImage: 'Carilah Movie Kesukaan Mu'
  }

  return (
    <div className="w-[88%] m-auto mt-20 rounded-2xl border">

      <Navbar links={propsComponent.linkNames} linkd={propsComponent.linkNamed}/>
      <Jumbotron url={propsComponent.urlImage} content={propsComponent.contentImage}/>

    </div>
  );
}
