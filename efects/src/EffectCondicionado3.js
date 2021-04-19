import React, { useEffect, useState, useMemo } from "react";

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

    //Aunque con cada renderización se instancia un words, es un tipo nativo - string -, así que es comparable, y no nos dara problemas
    const words = useMemo(() => {
        console.log("memoización!!");
        return children.split(" ");
        }, [children]);

    useEffect(() => {
        console.log("useEffect!!");
    }, [words]);

    return (
        <>
            <h1>useEffect con useMemo</h1>
            <p>{children}</p>
            <p>
                <strong>{words.length} - palabras</strong>
            </p>
        </>
    );
}
