import React, { useState } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import PrimaryButton from '../buttons/PrimaryButton';

const PopoverDropdown = ({
    btnText,
    dropdownContent,
    className,
    selectedValue,
    handleSelect,
    popoverPosition,
    btnClassName,
    contentClassName,
    notSelect = false
}) => {
    const [open, setOpen] = useState(false);
    const options = !notSelect ? dropdownContent?.map(option => ({
        label: option?.key,
        value: option?.value,
    })) : null;

    const handleClickAwayDropdown = () => {
        setOpen(false);
    }
    const handleClickDropdown = () => {
        setOpen(!open);
    }
    const styles = {
        position: 'absolute',
        top: 40,
        left: popoverPosition == "left" ? 0 : -110,
        zIndex: 1,
        border: '1px solid',
        p: 1,
        minWidth: '200px',
        maxHeight: '300px',
        overflow : 'auto',
        overflowWrap: 'anywhere',
        bgcolor: 'var(--card-background-color)'
    };

    return (
        <ClickAwayListener onClickAway={handleClickAwayDropdown}>
            <Box sx={{ position: 'relative' }} className={className}>
                <PrimaryButton
                    text={btnText || ""}
                    type="button"
                    isLoading={false}
                    className={`relative ${btnClassName}` }
                    onClick={handleClickDropdown}
                    icon="angle-down"
                    iconPosition="right"
                />
                {open ?
                    (notSelect ?
                        <Box className={`appCard !absolute ${contentClassName}`} sx={styles}>
                            {dropdownContent}
                        </Box>
                         :
                        <Box sx={styles} className={`appCard ${contentClassName}`}>
                            {options.map((item) => (
                                <div
                                    key={item.value}
                                    onClick={() => handleSelect(item.value)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '8px',
                                        backgroundColor: 'transparent',
                                        transition: 'background-color 0.2s ease',
                                    }}
                                    className="popover-item"
                                >
                                    {item.label}
                                </div>
                            ))}

                        </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    );
};

export default PopoverDropdown;
