import React, { useState, useEffect } from "react";


const useAnyKeyToRender = () => {
    const [, forceRender] = useState();

    useEffect(() => {
        console.log("Inicializa");
        window.addEventListener("keydown", forceRender);
        return () => window.removeEventListener("keydown", forceRender);
    }, []);
};

export default function Efecto({ children = "No te lo vas a creer, pero ..." }) {
    useAnyKeyToRender();
    console.log("redenrización!!");
    //Cada renderización instancia un nuevo Array
    const words = children.split(" ");

    useEffect(() => {
        console.log("useEffect!!");
    }, [words]);

    return (
        <>
            <h1>useEffect condicionado a un objeto custom - no comparable</h1>
            <p>{children}</p>
            <p>
                <strong>{words.length} - palabras</strong>
            </p>
        </>
    );
}
