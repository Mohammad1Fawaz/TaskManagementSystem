import { useState } from "react"

/* eslint-disable react/prop-types */
export default function SearchInput({ className, value, onChange, ...props }) {
    const [inputType, setInputType] = useState("password");

    function togglePasswordVisibility() {
        setInputType(inputType === 'password' ? 'text' : 'password');
    }

    return <div className={className}>
        <input type={inputType} name="password" className="form-control text-sm" placeholder="Password" value={value} onChange={onChange} {...props} />
        <i className='fas fa-search icon absolute text-black text-center flex-center right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={togglePasswordVisibility}></i>
    </div>
}