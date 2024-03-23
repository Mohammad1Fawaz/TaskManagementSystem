/* eslint-disable react/prop-types */
import Select from 'react-select';

export default function RolesInput({ permissions, className, handleSelectChange }) {

    const options = permissions?.map(permission => ({
        label: permission.name,
        value: permission.id,
    }));

    const selectedOption = "Roles"

    return (<div className={className}>
        <Select
            options={options}
            name="role"
            onChange={(selectedOption) => handleSelectChange(selectedOption)}
            isSearchable={true}
            className='w-full'
            isMulti={true}
            placeholder={selectedOption}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    minHeight: '0.25rem',
                    width: "100%",
                    fontSize: "13px",
                    borderRadius: '0.25rem 0 0 0.25rem',
                    boxShadow: 'none',
                    outline: 'none',
                    borderColor: state.isFocused ? 'var(--input-focus-primary-color)':'',
                    '&:hover': {
                        borderColor: 'var(--input-hover-primary-color)'
                    },
                    backgroundColor: 'transparent'
                }),
                menu: (provided) => ({
                    ...provided,
                    minHeight: "25vh",
                    width: "100%",
                    cursor:'pointer !important'
                }),
                option: (provided) => ({
                    ...provided,
                    '&:hover': {
                        backgroundColor: 'var(--main-hover-primary-color)',
                        color: "#fff"
                    },
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    padding: 0
                })
            }}
        />
    </div>);
}