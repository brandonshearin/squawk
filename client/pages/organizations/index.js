import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import client from "../../api/apollo-client-ssr";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

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

export default function Organizations({
  organizations = [
    {
      id: "",
      name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      website: "",
    },
  ],
}) {
  const { data, error, loading } = useQuery(LIST);

  const card = organizations.map((org) => {
    const tabList = [
      {
        key: "tab1",
        tab: "Region",
      },
      {
        key: "tab2",
        tab: "Contact",
      },
    ];
    const contentList = {
      tab1: <p>{`${org.address}, ${org.city}, ${org.state}`}</p>,
      tab2: (
        <>
          <p>Phone: {org.phone}</p>
          <p>Website: {org.website}</p>
        </>
      ),
    };

    const [state, setState] = useState({
      key: "tab1",
      noTitleKey: "app",
    });

    const onTabChange = (key, type) => {
      console.log(key, type);
      setState({ [type]: key });
    };
    return (
      <Col span={8} key={org.id} xs={24} sm={12} md={8} lg={6}>
        <Card
          title={org.name}
          extra={
            <Link href={`/organizations/${org.id}`}>
              <a>More</a>
            </Link>
          }
          hoverable
          tabList={tabList}
          activeTabKey={state.key}
          onTabChange={(key) => {
            onTabChange(key, "key");
          }}
        >
          {contentList[state.key]}
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
          city
          state
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
