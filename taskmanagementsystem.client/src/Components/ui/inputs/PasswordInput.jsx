import { useState } from "react"

/* eslint-disable react/prop-types */
export default function PasswordInput({ value, onChange, ...props }) {
    const [inputType, setInputType] = useState("password");

    function togglePasswordVisibility() {
        setInputType(inputType === 'password' ? 'text' : 'password');
    }

    return <>
        <input type={inputType} name="password" className="form-control text-sm" placeholder="Password" value={value} onChange={onChange} {...props} />
        <i className={`fas ${inputType === 'password' ? 'fa-eye' : 'fa-eye-slash'} absolute text-center flex-center right-3 top-1/2 -translate-y-1/2 cursor-pointer`} onClick={togglePasswordVisibility}></i>
    </>
}