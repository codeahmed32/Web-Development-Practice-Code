import React from 'react';
import { useState } from 'react';

export const Area = () => {

    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [result, setResult] = useState(0)

    function calculateArea(e) {
        e.preventDefault();

        const calculatedArea = length * width;
        setResult(calculatedArea);
    }
    return (
        <div>
            <h1>Area Calculate</h1>
            <form onSubmit={calculateArea}>
                <input type="number" name="length" id="length" placeholder="Enter Length" onChange={(e) => { setLength(Number(e.target.value)) }} />
                <input type="number" name="Width" id="width" placeholder="Enter Width" onChange={(e) => { setWidth(Number(e.target.value)) }} />
                <button> Calculate Area</button>
                <div>The Calculated Area is {result}</div>
            </form>

        </div>
    )
}
