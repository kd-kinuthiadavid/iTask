import axios from "axios";

const setAuthTokenHeader = (token) => {
  if (token) {
    // set default 'Authorization' headers for axios
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete the header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthTokenHeader;
