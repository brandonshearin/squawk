import axios from "axios";

const buildClient = ({ req }) => {
  // undefined should be a STRING!!!
  if (typeof window === "undefined") {
    // we are on the server
    const baseURL =
      process.env.ENV === "DEVELOPMENT"
        ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
        : "http://squawktherapy.com";
        
    const host =
      process.ENV === "DEVELOPMENT" ? "squawk.dev" : "www.squawktherapy.com";
    return axios.create({
      baseURL,
      headers: { Host: host, ...req.headers },
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
