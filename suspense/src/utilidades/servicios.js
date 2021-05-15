import { GraphQLClient } from "graphql-request";

//Aplica alrededor de la promise
export function wrapPromise(promise) {
    //... administra el estado. Pendiente de resolver la promise, o resuelta. Cuando resuelta, se puede resolver con un error o con los datos 
    let status = "pending";
    let result;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
            console.log(result);

        }
    );
    //Retornamos un método que gestiona las tres posibilidades, hacer un throw de la Promise, un throw del error, o los datos
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
}

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

export const recuperaInfo = async function (usuario) {
    const variables = {
        login: usuario,
    }
    return await client.request(query, variables).then(({ user }) => user);
};
