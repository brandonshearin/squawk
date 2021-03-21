import { Typography } from "antd";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const { Title } = Typography;
// this call is executed on the browser
const LandingPage = () => {
  const [session, loading] = useSession();

  return (
    <main>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email}
          <br />
          <div>You can now access our app's secret pages</div>
          <button>
            <Link href="/secret">To the secret page</Link>
          </button>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </main>
  );
};

export default LandingPage;
