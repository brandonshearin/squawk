import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import client from "../../api/apollo-client-ssr";
import { gql, useQuery } from "@apollo/client";

const LIST = gql`
  query blah {
    list {
      id
      name
      phone
      address
      website
    }
  }
`;

export default function Organizations({ organizations }) {
  const { data, error, loading } = useQuery(LIST);
  console.log(data, error, loading);

  const card = organizations.map((org) => {
    return (
      <Col span={8} key={org.id}>
        <Card
          title={org.name}
          extra={
            <Link href={`/organizations/${org.id}`}>
              <a>More</a>
            </Link>
          }
          hoverable
          loading={!org.name}
        >
          {`${org.address}, ${org.city}`}
          {`\n`}
          Phone: {org.phone}
          {`\n`}
          Website: {org.website}
        </Card>
      </Col>
    );
  });
  return (
    <div style={{ padding: "30px" }}>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 }, // horizontal
          { xs: 8, sm: 16, md: 24, lg: 32 }, // vertical
        ]}
      >
        {card}
      </Row>
    </div>
  );
}

export async function getStaticProps(context) {
  const { data } = await client.query({
    query: gql`
      query blah {
        list {
          id
          name
          phone
          address
          website
        }
      }
    `,
  });

  return {
    props: {
      organizations: data.list,
    },
    revalidate: 1,
  };
}
