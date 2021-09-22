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
    static async listPulls(repositoryUrl) {
        const { owner, repository } = GitHub._parseRepositoryUrl(repositoryUrl);

        const { data } = await axios
            .get(`/repos/${owner}/${repository}/pulls`)
            .then((res) => res);
        return data;
    }

    /**
     * Parse owner and repository from url.
     * @param {String} repositoryUrl
     * @returns {Object} { owner, repository }
     */
    static _parseRepositoryUrl(repositoryUrl) {
        const [owner, repository] = repositoryUrl.split('/').slice(-2);

        return {
            owner,
            repository,
        };
    }
}

module.exports = GitHub;
