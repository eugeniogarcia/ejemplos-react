import React, { useState, useEffect } from "react";

function GitHubUser({ login }) {
  //Indicamos el estado de carga usando estos estados
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!login) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`)
      .then(data => data.json())
      .then(setData)
      //Indicamos ya se han cargado los datos
      .then(() => setLoading(false))
      //Indicamos que se ha producido un error
      .catch(setError);
  }, [login]);

  //Pagina a mostrar cuando se está cargando, o hay un error
  if (loading) return <h1>loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  
  //Sino hay datos no se muestra nada
  if (!data) return null;

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

export default function App() {
  return <GitHubUser login="eugeniogarcia" />;
}
