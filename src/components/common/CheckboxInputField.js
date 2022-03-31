import React from 'react';

const CheckboxInputField = ({ label, options, handleChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>
                <select
                    id={label}
                    className="form-control"
                    onChange={handleChange}
                >
                    {options.map(option =>
                        <option key={option} value={option}>{option}</option>
                    )}
                </select>
            </label>
        </div>

    );
};

export default CheckboxInputField;