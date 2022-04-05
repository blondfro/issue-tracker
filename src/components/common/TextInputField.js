import React from 'react';

const TextInputField = ({ label, name, labelText, value, onChange}) => {
    return (
        <div className="form-group">
            {labelText}
            <label htmlFor={name} className="form-label">
                <input
                    name={name}
                    className="form-control"
                    type="text"
                    id={label}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default TextInputField;