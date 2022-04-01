import React from 'react';

const Button = ({ cssId, itemId, type, classes, handleClick, value}) => {
    return (
        <button
            id={cssId}
            type={type}
            className={classes}
            onClick={itemId ? (()=> handleClick(itemId)) : handleClick}
        >
            {value}
        </button>
    );
};

export default Button;