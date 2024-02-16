/* eslint-disable react/prop-types */
export default function TextInput({ type = 'text', name, placeholder, value, onChange, icon, ...props }) {
    return <>
        <input type={type} name={name} className="form-control text-sm" placeholder={placeholder} value={value} onChange={onChange} {...props} />
        {icon && <i className={`fas ${icon} absolute text-center flex-center right-3 top-1/2 -translate-y-1/2`}></i>}
    </>
}