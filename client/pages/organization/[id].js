import buildClient from "../../api/build-client";
import useRequest from "../../hooks/useRequest";
import axios from "axios";
import { useEffect } from "react";

export default function Organization({ data }) {
  console.log(data);
  return (
    <div>
      {data.name}
      {data.address}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "603b93fda582cf0019141a73" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const host =
    process.ENV === "DEVELOPMENT" ? "squawk.dev" : "www.squawktherapy.com";
  // first way, specify the headers property
  const {
    data,
  } = await axios.get(
    `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orgs/${params.id}`,
    { headers: { Host: host } }
  );
  // second way, call the specific service WITH the port #
  // const resp = await axios.get(
  //   "http://organizations-srv:3000/api/orgs/603b93fda582cf0019141a73"
  // );

  return {
    props: {
      data,
    },
  };
}
