import React from 'react';

import "./input-styles.css";

const TextInputField = ({ label, name, labelText, value, onChange}) => {
    return (
        <div className="form-floating mb-3">
            <input
                name={name}
                className="form-control"
                type="text"
                id={label}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={name}>
                {labelText}
            </label>
        </div>
    );
};

export default TextInputField;