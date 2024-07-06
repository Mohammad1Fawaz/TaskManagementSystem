/* eslint-disable react/prop-types */
export default function TextInput({ type = 'text', name, className, placeholder, value, onChange, icon, ...props }) {
    return <div className={`${className} relative`}>
        <input type={type} name={name} className="form-control text-sm" placeholder={placeholder} value={value} onChange={onChange} {...props} />
        {icon && <i className={`fas ${icon} icon absolute text-center flex-center right-3 top-1/2 -translate-y-1/2`}></i>}
    </div>
}