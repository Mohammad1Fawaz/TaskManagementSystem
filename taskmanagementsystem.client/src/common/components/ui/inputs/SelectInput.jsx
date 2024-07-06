/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function SelectInput({ selectOptions, className, handleSelectChange, isMulti = false, placeholder = "All", inputHeight, icon, selectedValue }) {
    const options = selectOptions?.map(option => ({
        label: option?.key,
        value: option?.value,
    }));

    const [selectedOption, setSelectedOption] = useState(options.find(option => option.value === selectedValue));

    return (
        <div className={`${className} relative`}>
            <Select
                options={options}
                value={selectedOption}
                name="role"
                onChange={handleSelectChange}
                isSearchable={true}
                className={`w-full ${inputHeight}`}
                isMulti={isMulti}
                placeholder={placeholder}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: '0.25rem',
                        fontSize: "13px",
                        boxShadow: 'none',
                        outline: 'none',
                        paddingLeft: '20px',
                        borderColor: state.isFocused ? 'var(--input-focus-primary-color)' : '',
                        '&:hover': {
                            borderColor: 'var(--main-hover-secondary-color)'
                        },
                        backgroundColor: 'transparent',
                        position: 'relative',
                        color: 'var(--text-secondary-color) !important',
                    }),
                    menu: (provided) => ({
                        ...provided,
                        minHeight: "25vh",
                        width: "100%",
                        zIndex: 100,
                        backgroundColor: "var(--card-background-color)",
                        position: 'absolute',
                        top: 0,
                        left :0
                    }),
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? 'var(--button-hover-primary-color)' : state.isFocused ? 'var(--input-hover-primary-color)' : 'transparent',
                        '&:hover': {
                            backgroundColor: 'var(--button-hover-primary-color)',
                            color: "var(--text-primary-color)"
                        },
                        color: state.isSelected ? "var(--text-primary-color) !important" : "var(--text-primary-color) !important"
                    }),
                    dropdownIndicator: (provided) => ({
                        ...provided,
                        padding: 0
                    })
                }}
            />
            {icon && <i className={`fas ${icon} icon absolute text-center flex-center left-2 top-1/2 -translate-y-1/2`}></i>}
        </div>
    );
}
