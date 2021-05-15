import { GraphQLClient } from "graphql-request";
import { useState,useEffect } from "react";

import UserDetails from "./GitHubUser"
import SearchForm from "./SearchForm"
import List from "./Lista"

const query = `
query findRepos($login:String!) {
    user(login:$login) {
        login
            name
            location
            avatar_url: avatarUrl
            repositories(first:100) {
                totalCount
                nodes {
                    name
            }
        }
    }
}
`;

const client = new GraphQLClient(
    "https://api.github.com/graphql",
    {
        headers: {
            Authorization: `Bearer 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`
        }
    }
);

export default function ReposGraphQL({ usuario = "eugeniogarcia"}) {
    const [login, setLogin] = useState(usuario);
    const [userData, setUserData] = useState();

    useEffect(() => {
        client
            .request(query, { login })
            .then(({ user }) => user)
            .then(setUserData)
            .catch(console.error);
    }, [client, query, login]);
    
    if (!userData) return <p>Cargando Datos...</p>;
    return (
        <>
            <SearchForm usuario={login} cambia={setLogin} />
            <UserDetails {...userData} />
            <p>{userData.repositories.totalCount} - repos</p>
            <List
                data={userData.repositories.nodes}
                renderItem={repo => <span>{repo.name}</span>}
            />
        </>
    );
}