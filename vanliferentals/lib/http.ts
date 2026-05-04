import { NextResponse } from "next/server";
import { Result } from "./types";

export function jsonResult<T>(result: Result<T>, successStatus = 200) {
  if (result.ok) {
    return NextResponse.json({ data: result.data }, { status: successStatus });
  }
  return NextResponse.json({ error: result.error }, { status: result.status });
}

export async function parseJson(request: Request): Promise<Result<unknown>> {
  try {
    const data = await request.json();
    return { ok: true, data };
  } catch {
    return { ok: false, status: 400, error: { message: "Invalid JSON" } };
  }
}

export function jsonError(
  status: number,
  message: string,
  details?: string[]
) {
  return NextResponse.json({ error: { message, details } }, { status });
}
