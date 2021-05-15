import React, { useState, useEffect} from "react";
import List from "./Lista"
import { recuperaInfo, wrapPromise} from "./utilidades/servicios"

function UserDetails({ avatar_url, login, name, location}) {
    return (
        <div className="githubUser">
            <img src={avatar_url} alt={login} style={{ width: 200 }} />
            <div>
                <h1>{login}</h1>
                {name && <p>{name}</p>}
                {location && <p>{location}</p>}
            </div>
        </div>
    );
}

//Define el recurso
var recurso;

export function ReposGraphQLSusp({ usuario = "eugeniogarcia" }) {

    //Cremos el recurso
    if (!recurso) recurso = wrapPromise(recuperaInfo(usuario));
    //Obtenemos los datos
    const userData = recurso.read()

    //Renderizamos los datos
    return (
        <>
            <UserDetails {...userData} />
            <p>{userData.repositories.totalCount} - repos</p>
            <List
                data={userData.repositories.nodes}
                renderItem={repo => <span>{repo.name}</span>}
            />
        </>
    );
}

export function ReposGraphQL({ usuario = "eugeniogarcia" }) {
    const [userData, setUserData] = useState();

    useEffect(() => {
        recuperaInfo(usuario)
            .then(setUserData)
            .catch(console.error);
    }, [usuario]);

    if (!userData) return <p>Cargando Datos...</p>;
    return (
        <>
            <UserDetails {...userData} />
            <p>{userData.repositories.totalCount} - repos</p>
            <List
                data={userData.repositories.nodes}
                renderItem={repo => <span>{repo.name}</span>}
            />
        </>
    );
}