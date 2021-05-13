import React, { useEffect } from "react";
import { useIterator } from "./hooks";
import RepositoryReadme from "./RepoReadme"

export default function RepoMenu({ repositories, login,onSelect = f => f }) {
    //Usamos nuestro custom hook
    //Este hook nos asegura que si usamos un determinado repositorio, al estar los valores memoizados, entre renders la instancia a la que apuntamos sera fisicamente la misma
    const [{ name }, previous, next] = useIterator(repositories);

    useEffect(() => {
        if (!name) return;
        onSelect(name);
    }, [name]);

    return (
        <>
        <div style={{ display: "flex" }}>
            <button onClick={previous}>&lt;</button>
            <p>{name}</p>
            <button onClick={next}>&gt;</button>
        </div>
        <RepositoryReadme login={login} repo={name}/>
        </>
    );
}
