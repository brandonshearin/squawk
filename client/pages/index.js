import { Typography, Button } from "antd";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const { Title } = Typography;
// this call is executed on the browser
const LandingPage = () => {
  const [session, loading] = useSession();

  return (
    <>
      <h1>Welcome to squawk therapy</h1>
      <Button>
        <Link href="/organizations">Go to organizations overview</Link>
      </Button>
    </>
  );
};

export default LandingPage;
