/* eslint-disable react/prop-types */

export default function DangerButton({ text, type, className, value, onClick, icon }) {
    return <button value = {value} type={type} className={`${className} btn btn-danger`} onClick={onClick}>
        {text}
        <i className={icon}></i>
    </button>
}