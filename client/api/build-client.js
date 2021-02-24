import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    console.log(">>>> env is ", process.env.ENV);
    // we are on the server
    const baseURL =
      process.env.ENV === "DEVELOPMENT"
        ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local"
        : "http://squawktherapy.com";
    return axios.create({
      baseURL,
      headers: req.headers,
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
