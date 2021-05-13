import React from "react";
import Fetch from "./hooks";

export default function GitHubUser({ login }) {
    return (
        <Fetch
            uri={`https://api.github.com/users/${login}`}
            renderSuccess={UserDetails}
        />
    );
}

//Método que define como mostrar los datos recuperados
function UserDetails({ data }) {
    return (
        <div className="githubUser">
            <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
            <div>
                <h1>{data.login}</h1>
                {data.name && <p>{data.name}</p>}
                {data.location && <p>{data.location}</p>}
            </div>
        </div>
    );
}