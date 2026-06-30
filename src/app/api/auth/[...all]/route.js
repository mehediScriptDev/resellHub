import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/db";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function GET(request) {
  await ensureMongoConnection();
  return handler.GET(request);
}

export async function POST(request) {
  await ensureMongoConnection();
  return handler.POST(request);
}
