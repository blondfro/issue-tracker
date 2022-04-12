import React from 'react';

import "./input-styles.css"

const SelectInputField = ({label, name, options, value, labelText, onChange}) => {
    return (
        <div className="form-floating mb-3">
            <select
                id={label}
                name={name}
                className="form-select select-input"
                value={value}
                onChange={onChange}
            >
                {options.map(option =>
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
            <label htmlFor={label}>
                {labelText}
            </label>


        </div>

    );
};

export default SelectInputField;