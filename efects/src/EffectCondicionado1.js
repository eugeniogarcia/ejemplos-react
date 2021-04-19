import React, { useState, useEffect, Fragment } from "react";

export default function EffectCondicionado() {
    const [val, set] = useState("");
    const [phrase, setPhrase] = useState("frase de ejemplo");

    const createPhrase = () => {
        setPhrase(val);
        set("");
    };

    useEffect(() => {
        console.log(`escribiendo "${val}"`);
    }, [val]);

    useEffect(() => {
        console.log(`frase grabada: "${phrase}"`);
    }, [phrase]);

    return (
        <Fragment>
            <h1>useEffect condicionado</h1>
            <label>Frase favorita:{' '}</label>
            <input
                value={val}
                placeholder={phrase}
                onChange={e => set(e.target.value)}
            />
            <br />
            <label>{`Frase almacenada: ${phrase}`}</label>
            <br />
            <button onClick={createPhrase}>send</button>
        </Fragment>
    );
}
