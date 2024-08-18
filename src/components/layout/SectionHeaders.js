export default function SectionHeaders({subHeader, mainHeader}) {
    return (
        <>
        <div className="text-center">
            <h3 className="uppercase text-gray-500 font-semibold">
                {subHeader}
            </h3>
            <h2 className="text-red-500 font-bold text-4xl">
                {mainHeader}
            </h2>
        </div>
        </>
    )
}