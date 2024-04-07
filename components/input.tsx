"use client";


const InputField = (props: any) => {
    const { country, setCountry } = props;
   
    return (
        <div className="w-full relative p-6">
            <input
                value={country} onChange={(e) => setCountry(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5" required />
            <svg 
            onClick={() => setCountry('')}
            width="14" height="14" className="absolute top-9 right-9 cursor-pointer" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.353553" y1="0.646447" x2="13.3536" y2="13.6464" stroke="black" />
                <line x1="0.646447" y1="13.6464" x2="13.6464" y2="0.646446" stroke="black" />
            </svg>
        </div>

    );
}

export default InputField;