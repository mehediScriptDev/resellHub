const PRODUCTION_URL = "https://resell-hub-chi.vercel.app";

/**
 * Public frontend URL used for Better Auth OAuth callbacks.
 * Google redirect URI will be: {this}/api/auth/callback/google
 */
export function getAppUrl() {
  const candidates = [
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
  ]
    .filter(Boolean)
    .map((url) => url.replace(/\/$/, ""));

  const production = candidates.find((url) => !url.includes("localhost"));
  if (production) return production;

  if (process.env.VERCEL === "1") {
    return PRODUCTION_URL;
  }

  return candidates[0] || "http://localhost:3000";
}

export function getGoogleRedirectUri() {
  return `${getAppUrl()}/api/auth/callback/google`;
}
