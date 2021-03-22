import NextAuth from "next-auth";
import { signIn } from "next-auth/client";
import Providers from "next-auth/providers";

const options = {
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.DATABASE_URL,
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
    async jwt(token, user, account, profile, isNewUser) {
      // add user's mongo id to the jwt
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    cookieName: "currentUser",
  },
};

export default (req, res) => NextAuth(req, res, options);
