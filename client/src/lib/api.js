const Axios = require('axios');

const { REACT_APP_API_URL: API_URL } = process.env;

const axios = Axios.create({
    baseURL: API_URL,
});
export const getPulls = async (repositoryUrl) => {
    return await axios.get(repositoryUrl).then((res) => res.data);
};
