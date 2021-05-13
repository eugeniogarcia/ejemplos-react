import React, { useState, useEffect } from "react";
import {  useCallback, useMemo } from "react";


function useFetch(uri) {
    //Mantiene el estado de la petición. Datos, si se está o no haciendo la petición, y el error
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    //El useEffect solo se procesa cuando cambia la uri
    useEffect(() => {
        if (!uri) return;
        fetch(uri)
            .then(data => data.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError);
    }, [uri]);

    //Devuelve un objeto con los tres estados
    return {
        loading,
        data,
        error
    };
}

//Por defecto especificamos que mostrar mientras se hace la carga, y en caso de error
export default function Fetch({
    uri,
    renderSuccess,
    loadingFallback = <p>cargando datos...</p>,
    renderError = error => <pre>{JSON.stringify(error, null, 2)}</pre>
}) {
    //Recuperamos la información con nuestro custom hook
    const { loading, data, error } = useFetch(uri);
    // Lo que se muestra mientras se hace la carga, cuando hay un error, o cuando se recuperan los datos, es configurable
    if (loading) return loadingFallback;
    if (error) return renderError(error);
    if (data) return renderSuccess({ data });
}

export const useIterator = (items = [], initialValue = 0) => {
    const [i, setIndex] = useState(initialValue);

    const prev = useCallback(() => {
        if (i === 0) return setIndex(items.length - 1);
        setIndex(i - 1);
    }, [i]);

    //Retorna una funcion, pero al usar useCallback, nos garantizamos que para el mismo i, la funcion obtenida será la misma instancia - no solamente el mismo valor
    const next = useCallback(() => {
        if (i === items.length - 1) return setIndex(0);
        setIndex(i + 1);
    }, [i]);

    //Retorna un item, pero al usar useMemo, nos garantizamos que para el mismo i, el item obtenido será la misma instancia - no solamente el mismo valor
    const item = useMemo(() => items[i], [i]);

    return [item || items[0], prev, next];
};
