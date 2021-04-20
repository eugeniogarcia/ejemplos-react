import React, { useReducer } from "react";

const initialState = {
    id: "983397695",
    firstName: "Eugenio",
    lastName: "Garcia Castellanos",
    city: "Valladolid",
    state: "Castilla y Leon",
    email: "egsmartin@gmail.com",
    admin: false
};

function User() {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    );

    return (
        <div>
            <h1>
                {state.firstName} {state.lastName} - {state.admin ? "Administrador" : "Usuario"}
            </h1>
            <p>Email: {state.email}</p>
            <p>
                Ubicación: {state.city}, {state.state}
            </p>
            {!state.admin &&
            <button onClick={() => setState({ admin: true })}>Make Admin</button>}
            {state.admin &&
                <button onClick={() => setState({ admin: false })}>Make User</button>}
            <br/>
            <br />
            {!state.admin
            ?<button onClick={() => setState({ admin: true })}>Hacer Administrador</button>
            :<button onClick={() => setState({ admin: false })}>Hacer Usuario</button>}
        </div>
    );
}

export default function Reducer() {
    return <User />;
}
