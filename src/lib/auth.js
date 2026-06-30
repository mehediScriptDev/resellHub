import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { db, mongoClient } from "./db";
import { getAppUrl } from "./app-url";

export const auth = betterAuth({
  baseURL: getAppUrl(),
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client: mongoClient }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
