import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

const MAX_MESSAGE = 2000;
const MAX_STACK = 10000;
const MAX_DIGEST = 200;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const message =
      typeof body?.message === "string" ? body.message.slice(0, MAX_MESSAGE) : "Unknown";
    const stack = typeof body?.stack === "string" ? body.stack.slice(0, MAX_STACK) : undefined;
    const digest = typeof body?.digest === "string" ? body.digest.slice(0, MAX_DIGEST) : undefined;
    const source = typeof body?.source === "string" ? body.source : "client";

    logger.error("Client error report", {
      message,
      stack,
      digest,
      source,
    });

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    logger.error("Failed to log client error", { error: e });
    return new NextResponse(null, { status: 204 });
  }
}
