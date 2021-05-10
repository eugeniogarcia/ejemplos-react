async function requestGithubUser(githubLogin) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${githubLogin}`
        );
        const userData = await response.json();
        console.log(userData);
    } catch (error) {
        console.error(error);
    }
}

requestGithubUser("moonhighway");