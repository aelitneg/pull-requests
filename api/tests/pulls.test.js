const httpMocks = require('node-mocks-http');
const GitHub = require('../src/lib/github');

const PullsController = require('../src/controllers/pulls.controller');

// Mock GitHub module
const mockPulls = require('./data/pulls.json');
const mockCommits = require('./data/commits.json');

jest.mock('../src/lib/github');

GitHub.listPulls.mockResolvedValue(mockPulls);
GitHub.listPullCommits.mockResolvedValue(mockCommits);
GitHub._parseRepositoryUrl.mockReturnValue({ owner: 'foo', repository: 'bar' });

describe('Pulls Tests', () => {
    describe('controller', () => {
        describe('list', () => {
            const mockReq = httpMocks.createRequest({
                params: {
                    url: '/owner/repository',
                },
            });
            const mockRes = httpMocks.createResponse();

            test('should return array of pulls', async () => {
                const data = await PullsController.list(mockReq, mockRes).then(
                    (res) => res._getData(),
                );

                expect(Array.isArray(data)).toBeTruthy();
                expect(data.length).toEqual(mockPulls.length);
            });

            test('pulls should container array of commits', async () => {
                const [data] = await PullsController.list(
                    mockReq,
                    mockRes,
                ).then((res) => res._getData());

                expect(data).toHaveProperty('commits', mockCommits);
                expect(Array.isArray(data.commits)).toBeTruthy();
                expect(data.commits.length).toEqual(mockCommits.length);
            });
        });
    });
});
