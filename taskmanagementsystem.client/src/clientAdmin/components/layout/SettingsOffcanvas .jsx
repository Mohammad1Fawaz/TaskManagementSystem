// SettingsOffcanvas.js
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Typography from '@mui/material/Typography';

const SettingsOffcanvas = ({ show, handleCloseSettings, customThemeColors, handleColorChange }) => {
    return (
        <Offcanvas show={show} onHide={handleCloseSettings} placement='end' name='end' className="z-100 bg-[var(--main-background-primary-color)]">
            <Typography variant="h6">Customize Theme</Typography>
            <div className="color-picker-container h-full overflow-y-auto py-[50px] pl-[50px]">
                <div className="color-picker-scroll">
                    {Object.entries(customThemeColors).map(([variable, defaultValue]) => (
                        <div key={variable} className="color-picker-wrapper flex">
                            <label htmlFor={variable}>{variable.slice(2)}:</label>
                            <div className="color-picker-circle">
                                <input type="color" id={variable} value={customThemeColors[variable]} onChange={(e) => handleColorChange(variable, e.target.value)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Offcanvas>
    );
};

export default SettingsOffcanvas;
