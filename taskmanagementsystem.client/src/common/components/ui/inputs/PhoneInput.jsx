/* eslint-disable react/prop-types */
import Select from 'react-select';

export default function PhoneInput({ countries, className, handleSelectChange, handleInputChange, phoneNumberValue, phoneCodeValue }) {

    const options = countries.map(country => ({
        label: (
            <div className="flex items-center -justify-start gap-2">
                {country.phoneCode}
                <img src={country.flagSvg} className="w-6 h-5 z-100" alt="flag" />
            </div>
        ),
        value: country.phoneCode,
    }));

    const selectedOption = options.find(option => option.value === phoneCodeValue);

    return (<div className={className}>
        <Select
            options={options}
            value={selectedOption}
            onChange={(selectedOption) => handleSelectChange(selectedOption)}
            isSearchable={true}
            className="w-45"
            placeholder=""
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    height: '0.25rem',
                    width: "7rem",
                    fontSize: "13px",
                    borderRadius: '0.25rem 0 0 0.25rem',
                    boxShadow: 'none',
                    outline: 'none',
                    borderColor: state.isFocused ? 'var(--input-focus-primary-color)' : '#ced4da',
                    '&:hover': {
                        borderColor: 'var(--input-focus-primary-color)'
                    },
                    backgroundColor: 'transparent',
                    color : 'var(--text-primary-color)'
                }),
                menu: (provided) => ({
                    ...provided,
                    height: "25vh",
                    width: "10vw",
                    overflow: "hidden",

                }),
                option: (provided) => ({
                    ...provided,
                    '&:hover': {
                        backgroundColor: 'var(--main-hover-primary-color)',
                        color: "#fff",
                        cusrsor:'pointer'
                    },

                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    padding: 0
                })
            }}
        />
        <input type="text" name="phoneNumber" className="form-control rounded-l-none text-sm pr-5  w-full" value={phoneNumberValue} placeholder="Phone number" onChange={handleInputChange} />
        <i className="fas fa-phone icon absolute text-center flex-center right-3 top-1/2 -translate-y-1/2"></i>
    </div>);
}