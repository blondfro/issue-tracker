import React from 'react';

const TextAreaInputField = ({ label, name, labelText, value, onChange}) => {
    return (
        <div className="form-group">
            {labelText}
            <label htmlFor={name}>
                <textarea
                    name={name}
                    value={value}
                    id={label}
                    cols="30"
                    rows="4"
                    onChange={onChange}
                >

                </textarea>
            </label>
        </div>
    );
};

export default TextAreaInputField;