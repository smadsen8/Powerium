const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

//Function definitions
const createUser = (payload) => api.post(`user`, payload);
const getUserByEmail = (email) => api.post(`user/${email}`);

//Api functions that deal with client server data exchange
const apis = {
  createUser,
  getUserByEmail,
};

module.exports = apis;
