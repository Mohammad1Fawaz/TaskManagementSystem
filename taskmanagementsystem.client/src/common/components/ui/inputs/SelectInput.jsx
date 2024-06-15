/* eslint-disable react/prop-types */
import Select from 'react-select';

export default function SelectInput({ selectOptions, className, handleSelectChange, isMulti = false, placeholder = "All", inputHeight ,icon}) {

    const options = selectOptions?.map(option => ({
        label: option?.key?.toString().replace(/([A-Z])/g, ' $1'),
        value: option?.value,
    }));

    const selectedOption = placeholder

    return (<div className={`${className}`}>
        <Select
            options={options}
            name="role"
            onChange={(selectedOption) => handleSelectChange(selectedOption)}
            isSearchable={true}
            className={`w-full ${inputHeight}'`}
            isMulti={isMulti}
            placeholder={selectedOption}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    minHeight: '0.25rem',
                    fontSize: "13px",
                    boxShadow: 'none',
                    outline: 'none',
                    paddingLeft:'20px',
                    borderColor: state.isFocused ? 'var(--input-focus-primary-color)' : '',
                    '&:hover': {
                        borderColor: 'var(--main-hover-secondary-color)'
                    },
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary-color) !important'
                }),
                menu: (provided) => ({
                    ...provided,
                    minHeight: "25vh",
                    width: "100%",
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'var(--main-hover-primary-color)' : state.isFocused ? 'var(--input-hover-primary-color)' : 'transparent',
                    '&:hover': {
                        backgroundColor: 'var(--main-hover-primary-color)',
                        color: "#fff"
                    },
                    color: state.isSelected ? "var(--text-primary-color) !important" : "var(--text-secondary-color) !important"
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    padding: 0
                })
            }}
        />
        {icon && <i className={`fas ${icon} icon absolute text-center flex-center left-2 top-1/2 -translate-y-1/2`}></i>}
    </div>);
}