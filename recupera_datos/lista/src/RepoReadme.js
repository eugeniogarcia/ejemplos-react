import React, { useState, useEffect, useCallback } from "react";

import ReactMarkdown from "react-markdown";

export default function RepositoryReadme({ repo, login }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [markdown, setMarkdown] = useState("");

    const loadReadme = useCallback(async (login, repo) => {
        setLoading(true);
        const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
        //Encadena dos llamadas
        const { download_url } = await fetch(uri).then(res => res.json());
        const markdown = await fetch(download_url).then(res => res.text());
        setMarkdown(markdown);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!repo || !login) return;
        //Lanza la llamada a la api desde el useEffect
        loadReadme(login, repo).catch(setError);
    }, [repo]);

    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (loading) return <p>Cargando Datos...</p>;

    return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
