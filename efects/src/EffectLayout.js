import React, { useState, useLayoutEffect } from "react";

//Crea un custom hook que retorna las coordenadas
function useWindowSize() {
    //El estado son las coordenadas
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    //Captura la dimensión de la ventana
    const resize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log("redimensiona!!");
    };

    const setPosition = ({ x, y }) => {
        setX(x);
        setY(y);
    };

    //Inicializa. Fija un evento para inicializar
    useLayoutEffect(() => {
        window.addEventListener("resize", resize);
        //Tomamos el tamaño antes de que se pinte la ventana
        resize();
        console.log("useLayoutEffect (ventana)!!");
        return () => window.removeEventListener("resize", resize);
    }, []);

    useLayoutEffect(() => {
        console.log("useLayoutEffect (ratón)!!");
        window.addEventListener("mousemove", setPosition);
        return () => window.removeEventListener("mousemove", setPosition);
    }, []);


    //Retorna las coordenadas
    return [width, height, x, y];
}

export default function EffectLayout() {
    const [w, h,x,y] = useWindowSize();
    return (
        <div style={{ position: "absolute", x, y, cursor: "none" }}>
            <label>Tamaño de la ventana: {w}x{h}</label>
            <br/>
            <label>Posición del raton: {x}x{y}</label>
        </div>
    );
}
