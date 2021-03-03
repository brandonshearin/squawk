import buildClient from "../../api/build-client";
import { Card, Col, Row } from "antd";
import Link from "next/link";

export default function Organizations({ organizations }) {
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
  const client = buildClient(context);
  const { data: organizations } = await client.get("/api/orgs");
  return {
    props: {
      organizations,
    },
    revalidate: 1,
  };
}
