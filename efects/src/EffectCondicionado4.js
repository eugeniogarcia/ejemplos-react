import React, { useEffect, useState, useCallback } from "react";

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
    const fn = useCallback(() => {
        console.log("Hola Mundo");
    }, [children]);

    useEffect(() => {
        console.log("useEffect!!");
        fn();
    }, [fn]);

    return (
        <>
            <h1>useEffect con useCallback</h1>
            <p>{children}</p>
        </>
    );
}
