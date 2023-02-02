import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

export const SearchUsers = async (request) => {
    const { data } = await octokit.request(`GET /search/users?q=${request.searchTerm}&` + new URLSearchParams(request.pagination), {})
    return data;
}

export const UserDetailInfo = async (request) => {
    const { data } = await octokit.request(`GET /users/{username}`, {
        username: request.username
    })
    return data;
}

export const UserDetailRepos = async (request) => {
    const { data } = await octokit.request(`GET /users/{username}/repos?` + new URLSearchParams(request.pagination), {
        username: request.username
    })
    return data;
}

