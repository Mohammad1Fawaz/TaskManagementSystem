import React from 'react';

const Avatar = ({ text, image, size, sx }) => {
    return (
        <div className="">
            <div style={sx} className={`!w-[${size}] h-[${size}] rounded-[100%] border-2 flex-center p-2 border-[var(--button-primary-color)] font-bold text-lg`}>
                {text}
            </div>
        </div>
    );
}

export default Avatar;
