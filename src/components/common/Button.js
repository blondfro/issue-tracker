import React from 'react';

const Button = ({ cssId, itemId, type, classes, handleClick, value, disabled}) => {
    return (
        <button
            id={cssId}
            type={type}
            className={classes}
            onClick={itemId ? (()=> handleClick(itemId)) : handleClick}
            disabled={ disabled }
        >
            {value}
        </button>
    );
};

export default Button;