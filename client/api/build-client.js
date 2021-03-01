import axios from "axios";

const baseUrl =
  process.env.BASE_URL ||
  "http://squawktherapy.com";
const host = process.env.HOST || "www.squawktherapy.com";

const buildClient = ({ req = { headers: {} } }) => {
  // undefined should be a STRING!!!
  if (typeof window === "undefined") {
    // we are on the server
    return axios.create({
      baseURL: baseUrl,
      headers: { ...req.headers, Host: host },
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
