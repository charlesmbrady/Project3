import axios from "axios";

export default {
  // Gets user info
  getUser: function () {
    return axios.get('/auth/user');
  },
  // Logs the user out
  logout: function () {
    return axios.post('/auth/logout');
  },
  // Log the user in
  login: function (username, password) {
    return axios.post('/auth/login', { username, password });
  },
  // New user registration
  signup: function (userData) {
    return axios.post('/auth/signup', userData);
  },
  // Gets user drinks info
  getUserDrinks: function (userPhone) {
    alert('get user drinks: ' + userPhone);
    return axios.post('/auth/userdrinks', userPhone);
  },
  // update user info
  userUpdate: function (userData) {
    return axios.post('/auth/update', userData);
  }
};
