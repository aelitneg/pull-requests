const GitHub = require('../lib/github');

class Pulls {
    static async list(req, res, next) {
        try {
            // Get list of pull requests for repository
            const pulls = await GitHub.listPulls(
                decodeURIComponent(req.query.url),
            );

            // Fire off pull requests for individual pull requests in parallel
            const commitRequests = pulls.map((pull) => {
                return GitHub.listPullCommits(req.query.url, pull.number);
            });

            const commits = await Promise.all(commitRequests);

            // Merge pull and commit objects (array order is guaranteed)
            pulls.forEach((pull, index) => {
                pull.commits = commits[index];
            });

            return res.send(pulls);
        } catch (error) {
            // Catch errors from API, forward to client for now
            if (error.isAxiosError) {
                error.status = error.response.status;
                error.message = error.response.data.message;
            }

            return next(error);
        }
    }
}

module.exports = Pulls;
