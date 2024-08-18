import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
    return (
        <>
        <Hero />
        <HomeMenu />
        <section className="text-center my-16">
          <SectionHeaders subHeader={'Our story'}
          mainHeader={'About Us'}/>
          <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>Short description</p>
          <p>Short description 2</p>
          </div>
        </section>
        <section>
          <SectionHeaders subHeader={'Dont hesitate'}
          mainHeader={'Contact us'}/>
          <br/>
        </section>
        </>
    )
}
