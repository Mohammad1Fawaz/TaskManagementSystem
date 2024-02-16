/* eslint-disable react/prop-types */

export default function DangerButton({ type, width, onClick }) {
    return <button type={type} className={`${width ?? 'w-100'} btn btn-danger`} onClick={onClick}>
        Back
    </button>
}