import { useState } from "react";
export default function PasswordInput ({ value, onChange, placeholder ="......"}){
    const [show, setShow] = useState(false);

    return(
        <div className="relative mb-6">
            <input
            type={show ? "text" : "password"}
            className=" block w-full border rounded px-3 py-2 pr-10 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            />
            <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            aria-lable={show ? "Hide password" : "Show password"}
            >
                {show ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
    

