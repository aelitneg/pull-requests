const Axios = require('axios');

const Config = require('../lib/config');

const axios = Axios.create({
    baseURL: Config.apis.github,
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
});

class GitHub {
    /**
     * List pull requests for a repository.
     * @param {String} repositoryUrl
     */
    static listPulls(repositoryUrl) {
        const { owner, repository } = GitHub._parseRepositoryUrl(repositoryUrl);

        return axios
            .get(`/repos/${owner}/${repository}/pulls`, {
                headers: {
                    state: 'open', // Open pull requests only
                },
            })
            .then((res) => res.data);
    }

    /**
     * List commits for a pull request.
     * @param {String} repositoryUrl
     * @param {Number|String} number
     */
    static listPullCommits(repositoryUrl, number) {
        const { owner, repository } = GitHub._parseRepositoryUrl(repositoryUrl);

        return axios
            .get(`/repos/${owner}/${repository}/pulls/${number}/commits`)
            .then((res) => res.data);
    }

    /**
     * Parse owner and repository from url.
     * @param {String} repositoryUrl
     * @returns {Object} { owner, repository }
     */
    static _parseRepositoryUrl(repositoryUrl) {
        const [owner, repository] = repositoryUrl
            .replace(/\/$/, '') // Remove trailing '/'
            .split('/') // Break URL into its components
            .slice(-2); // Last two components are /owner/repository

        return {
            owner,
            repository,
        };
    }
}

module.exports = GitHub;
