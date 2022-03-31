import React from 'react';

const TextInputField = ({ label, type, placeholder, handleChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>
                <input
                    type={type}
                    className="form-control"
                    id={label}
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default TextInputField;