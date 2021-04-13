import React, { useState } from 'react';
function Input({ onAdd }) {
    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    }
    const handleOnKeyDown = async (e) => {
        if (e.keyCode === 13) {
            setInput(""); 
            onAdd(input);
        }
    }

    return (
        <div className="panel-block">
            <input
                className="input"
                value={ input }
                type="text"
                onChange={handleInput}
                onKeyDown={handleOnKeyDown}
            />
        </div>
    );
}

export default Input;