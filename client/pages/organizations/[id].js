import buildClient from "../../api/build-client";
import { PageHeader, Grid, Row, Col } from "antd";
import CommentList from "../../components/comments/commentList";
export default function Organization({ data }) {
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
  const client = buildClient({});
  const { data } = await client.get("/api/orgs");

  return {
    paths: data.map((org) => {
      return {
        params: {
          id: org.id,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const client = buildClient(params);
  const { data } = await client.get(`/api/orgs/${params.id}`);

  return {
    props: {
      data,
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
