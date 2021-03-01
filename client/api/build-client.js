import axios from "axios";

const buildClient = ({ req = { headers: {} } }) => {
  // undefined should be a STRING!!!
  if (typeof window === "undefined") {
    // we are on the server
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers: { ...req.headers, Host: process.env.HOST },
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
