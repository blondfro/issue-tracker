import React from 'react';

const Button = ({ id, type, classes, handleClick, value}) => {
    return (
        <button
            id={id}
            type={type}
            className={classes}
            onClick={handleClick}
        >
            {value}
        </button>
    );
};

export default Button;