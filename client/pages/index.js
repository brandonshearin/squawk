import buildClient from "../api/build-client";
import OrgList from "../components/orgList";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from '@ant-design/icons';

// this call is executed on the browser
const LandingPage = ({ user, organizations }) => {
  const { currentUser } = user;
  return (
    <div>
     <Tooltip title="search">
      <Button type="primary" shape="circle" icon={<SearchOutlined />} />
    </Tooltip>
      <OrgList organizations={organizations} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data: user } = await client.get("/api/users/currentuser");
  const { data: organizations } = await client.get("/api/orgs");
  return {
    props: {
      user,
      organizations,
    },
  };
}

export default LandingPage;
