import axios from 'axios';

const setAuthToken = token => {
  // check for token
  if (token) {
    // set global header x-auth-token to the token
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // else delete the x-auth-token header
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
