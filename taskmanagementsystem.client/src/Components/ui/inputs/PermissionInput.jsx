/* eslint-disable react/prop-types */
import Select from 'react-select';

export default function PermisionInput({ permissions,className, handleSelectChange }) {

    const options = permissions?.map(permission => ({
        label: permission.value,
        value: permission.value,
    }));

    const selectedOption = "All"

    return (<div className={className}>
        <Select
            options={options}
            name="role"
            onChange={(selectedOption) => handleSelectChange(selectedOption)}
            isSearchable={true}
            className='w-full'
            isMulti={true}
            placeholder={selectedOption }
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    minHeight: '0.25rem',
                    fontSize: "13px",
                    boxShadow: 'none',
                    outline: 'none',
                    borderColor: state.isFocused ? 'var(--input-focus-primary-color)' : '',
                    '&:hover': {
                        borderColor: 'var(--main-hover-secondary-color)'
                    },
                    backgroundColor: 'transparent'
                }),
                menu: (provided) => ({
                    ...provided,
                    minHeight: "25vh",
                    width: "100%",
                }),
                option: (provided) => ({
                    ...provided,
                    '&:hover': {
                        backgroundColor: 'var(--main-hover-secondary-color)',
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