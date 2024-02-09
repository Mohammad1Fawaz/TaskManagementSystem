/* eslint-disable react/prop-types */

export default function DangerButton({ width, onClick }) {
    return <button className={`${width ?? 'w-100'} btn btn-danger`} onClick={onClick}>
        Back
    </button>
}