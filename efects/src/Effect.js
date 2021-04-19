import React, { useState, useEffect, Fragment } from "react";

export default function Effect() {
    const [val, set] = useState("");
    const [phrase, setPhrase] = useState("frase de ejemplo");

    const createPhrase = () => {
        setPhrase(val);
        set("");
    };

    useEffect(() => {
        console.log(`escribiendo "${val}"`);
    });

    useEffect(() => {
        console.log(`frase grabada: "${phrase}"`);
    });

    return (
        <Fragment>
            <h1>useEffect</h1>
            <label>Frase favorita:{' '}</label>
            <input
                value={val}
                placeholder={phrase}
                onChange={e => set(e.target.value)}
            />
            <br/>
            <label>{`Frase almacenada: ${phrase}`}</label>
            <br />
            <button onClick={createPhrase}>send</button>
        </Fragment>
    );
}
