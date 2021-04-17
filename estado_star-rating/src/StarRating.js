import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Star({ puntua = true, onCambio}){
    return <FaStar color={puntua ? "red" : "grey"} onClick={onCambio}/>;
}

const creaArray = length => [...Array(length)];

export default function StarRating({ total = 5, style={},...props}) {
    const [seleccion, setSeleccion] = useState(0);
    return (
        <div style={{ padding: "5px", ...style }} {...props}>
    {creaArray(total).map((valor, i) => (<Star key={i} puntua={seleccion > i} onCambio={() => setSeleccion(i + 1)}/>))}
    <p>{seleccion} de {total} estrellas</p>
    </div>
    );
}