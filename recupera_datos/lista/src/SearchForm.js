import React from "react";
import { useState } from "react";

export default function Login({usuario="eugeniogarcia",cambia}){
    const [login, setLogin]=useState(usuario);

    return (
    <div>
        <label for="usuario">Usuario:</label>
        <input type="text" name="usuario" value={login} onChange={x=>
            setLogin(x.target.value)}/>
        <input type="submit" value="Buscar" onClick={(x) => {
            cambia(x.target.value.usuario);}}/>
    </div>);
}