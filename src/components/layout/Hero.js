import Image from "next/image"
import Right from "../icons/Right"

export default function Hero() {
    return (
        <section className="hero mt-4">
            <div className="py-12">
            <h1 className="text-4xl font-semibold">
                Everything<br/> is better<br/> with a <span className="text-red-500">Pizza</span>
            </h1>
            <p className="my-6 text-grey-500 text-sm">
                Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
            </p>
            <div className="flex gap-4 text-sm">
                <button className="bg-red-500 items-center flex gap-2 uppercase text-white px-4 py-2 rounded-full">Order Now <Right /></button>
                <button className="flex gap-2 py-2 text-gray-600 font-semibold">Learn more <Right /></button>
            </div>
            </div>
            <div className="relative"><Image src={'/pizza.png'} alt={'pizza'}  layout="fill" objectFit="contain" /></div>   
        </section>
    )
}