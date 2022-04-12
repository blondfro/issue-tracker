import React from 'react';
import "./input-styles.css";

const TextAreaInputField = ({ label, name, labelText, value, onChange}) => {
    return (
        <div className="form-floating mb-3">
            <textarea
                name={name}
                value={value}
                id={label}
                className="form-control textArea-input"
                cols="30"
                rows="4"
                onChange={onChange}
            >
            </textarea>
            <label htmlFor={name}>
                {labelText}
            </label>


        </div>
    );
};

export default TextAreaInputField;