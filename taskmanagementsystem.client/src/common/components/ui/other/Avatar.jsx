import React from 'react';

const Avatar = ({ text, image, size, sx, status, className, id , onClick }) => {
    return (
        <div className={className} id={id} onClick={onClick}>
            <div style={sx} className={`!w-[${size}] h-[${size}] rounded-[100%] border-2 flex-center p-2 border-[var(--button-primary-color)] font-bold text-lg position-relative`}>
                {text}
                {status !== undefined && (
                    <div className={`badge position-absolute top-0 right-0 !w-[11px] !h-[11px] p-1 rounded-[100%] ${status ? "bg-[green]" : "bg-[red]"} `}> </div>
                )}
            </div>
        </div>
    );
}



export default Avatar;
