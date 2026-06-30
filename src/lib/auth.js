import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { db, mongoClient } from "./db";
import { getAppUrl, getGoogleRedirectUri } from "./app-url";

const appUrl = getAppUrl();

export const auth = betterAuth({
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    appUrl,
    "http://localhost:3000",
    "https://resell-hub-chi.vercel.app",
  ],
  database: mongodbAdapter(db, { client: mongoClient }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: getGoogleRedirectUri(),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "buyer",
      },
    },
  },
  plugins: [
    jwt({
      jwt: {
        secret: process.env.BETTER_AUTH_SECRET,
      },
    }),
  ],
});
