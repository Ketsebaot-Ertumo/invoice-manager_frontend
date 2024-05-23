
export default function Footer () {
    return(
        <>
            <div className="bg-gray-200 text-center sm:text-right text-black text-opacity-40 md:text-md font-normal font-['Inter'] sm:pr-20 py-5 sm:py-10">
                <p>© <span>{new Date().getFullYear()}</span> Lepton Games. All rights reserved.</p>
            </div>
        </>
    )
}
