import buildClient from "../api/build-client";
import OrgList from "../components/orgList";
// this call is executed on the browser
const LandingPage = ({ user, organizations }) => {
  const { currentUser } = user;
  return (
    <div>
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
