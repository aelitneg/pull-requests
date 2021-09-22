const GitHub = require('../lib/github');

class Pulls {
    static async list(req, res, next) {
        try {
            const data = await GitHub.listPulls(req.query.url);

            const pulls = [];
            data.forEach((d) => {
                pulls.push({
                    id: d.id,
                    url: d.url,
                    number: d.number,
                    state: d.state,
                    title: d.title,
                    user: {
                        login: d.user.login,
                        avatarUrl: d.user.avatar_url,
                    },
                });
            });

            return res.send(pulls);
        } catch (error) {
            if (error.isAxiosError) {
                error.status = error.response.status;
                error.message = error.response.data.message;
            }

            return next(error);
        }
    }
}

module.exports = Pulls;
