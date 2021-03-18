import { PageHeader, Descriptions, Row, Col } from "antd";
import ReviewList from "../../components/comments/ReviewList";
import client from "../../api/apollo-client-ssr";
import { gql, useQuery } from "@apollo/client";
const defaultProps = {
  name: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
  website: "",
  type: "",
};

const GET_REVIEWS = gql`
  query GetReviews($id: String!) {
    get(id: $id) {
      reviews {
        id
        userId
        organizationId
        userEmail
        rating
        content
      }
    }
  }
`;
export default function Organization({ data = defaultProps }) {
  const { data: reviews, loading, error } = useQuery(GET_REVIEWS, {
    variables: { id: data.id },
  });

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={data?.name}
        subTitle={data.type}
      >
        <Descriptions>
          <Descriptions.Item label="Address">{`${data.address}, ${data.city}, ${data.state}`}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Phone">
            <a>{data.phone}</a>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Website">
            <a href={data.website} target="_blank">
              {data.website}
            </a>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>

      <Row>
        <Col span={12} offset={6}>
          {loading ? "Loading ..." : <ReviewList reviews={reviews.get} />}
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
  const { data } = await client.query({
    query: gql`
      query org($id: String!) {
        get(id: $id) {
          id
          address
          city
          state
          name
          phone
          website
          type
        }
      }
    `,
    variables: {
      id: params.id,
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
