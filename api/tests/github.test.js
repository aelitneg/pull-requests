const GitHub = require('../src/lib/github');

describe('GitHub Tests', () => {
    describe('_parseRepositoryUrl', () => {
        test('should return owner and repository from URL', () => {
            const data = {
                owner: 'owner',
                repository: 'repository',
            };
            const url = `https://github.com/${data.owner}/${data.repository}`;

            expect(GitHub._parseRepositoryUrl(url)).toEqual(data);
        });

        test('should handle URLs with / without "/" the same', () => {
            const url = '/a/b';
            expect(GitHub._parseRepositoryUrl(url)).toEqual(
                GitHub._parseRepositoryUrl(url + '/'),
            );
        });
    });
});
