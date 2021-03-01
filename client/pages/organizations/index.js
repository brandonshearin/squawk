import buildClient from "../../api/build-client";
import { Card, Col, Row } from "antd";
import Link from "next/link";

export default function Organizations({ organizations }) {
  const layout = organizations.map((org) => {
    return (
      <Col span={8} key={org.id}>
        <Card
          title={org.name}
          extra={
            <Link href={`/organizations/${org.id}`}>
              <a>More</a>
            </Link>
          }
        >
          {org.address}
        </Card>
      </Col>
    );
  });
  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={16}>{layout}</Row>
    </div>
  );
}

export async function getStaticProps(context) {
  const client = buildClient(context);
  const { data: organizations } = await client.get("/api/orgs");
  return {
    props: {
      organizations,
    },
    revalidate: 1
  };
}
