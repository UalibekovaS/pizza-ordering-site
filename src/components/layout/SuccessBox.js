export default function SuccessBox({children}) {
    return (
        <h2 className="text-center bg-green-100 p-4 rounded-lg border mb-4">
            {children}
        </h2>
    )
}