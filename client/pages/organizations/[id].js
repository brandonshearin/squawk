import { PageHeader, Grid, Row, Col } from "antd";
import CommentList from "../../components/comments/commentList";
import client from "../../api/apollo-client-ssr";
import { gql } from "@apollo/client";

export default function Organization({
  data = { name: "", address: "", city: "" },
}) {
  console.log(data);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={data?.name}
        subTitle={`${data?.address}, ${data?.city}`}
      />

      <Row>
        <Col span={12} offset={6}>
          <CommentList />
        </Col>
      </Row>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query orgIds {
        list {
          id
        }
      }
    `,
  });

  return {
    paths: data.list.map((org) => {
      console.log(org);
      return {
        params: {
          // id: org.id,
          id: "604f817a174d94005f90bebf",
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query org($id: String!) {
        get(id: $id) {
          id
          address
          city
          name
        }
      }
    `,
    variables: {
      // id: params.id,
      id: "604f817a174d94005f90bebf",
    },
  });
  return {
    props: {
      data: data.get,
    },
    revalidate: 1,
  };
}

// first way, specify the headers property
// const {
//   data,
// } = await axios.get(
//   `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orgs/${params.id}`,
//   { headers: { Host: host } }
// );

// second way, call the specific service WITH the port #
// const resp = await axios.get(
//   "http://organizations-srv:3000/api/orgs/603b93fda582cf0019141a73"
// );
