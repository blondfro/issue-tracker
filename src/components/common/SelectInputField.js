import React from 'react';

const SelectInputField = ({ label, name, options, value, labelText, onChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>
                {labelText}
                <select
                    id={label}
                    name={name}
                    className="form-control"
                    value={value}
                    onChange={onChange}
                >
                    {options.map(option =>
                        <option key={option} value={option}>{option}</option>
                    )}
                </select>
            </label>
        </div>

    );
};

export default SelectInputField;