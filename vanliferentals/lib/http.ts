import { NextResponse } from "next/server";
import { Result } from "./types";

export function jsonResult<T>(result: Result<T>, successStatus = 200) {
  if (result.ok) {
    return NextResponse.json({ data: result.data }, { status: successStatus });
  }
  return NextResponse.json({ error: result.error }, { status: result.status });
}

export async function parseJson(request: Request): Promise<Result<unknown>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const data = await request.json();
      return { ok: true, data };
    } catch {
      return { ok: false, status: 400, error: { message: "Invalid JSON" } };
    }
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData();
    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return { ok: true, data };
  }

  return {
    ok: false,
    status: 415,
    error: { message: "Unsupported content type" },
  };
}

export function jsonError(
  status: number,
  message: string,
  details?: string[]
) {
  return NextResponse.json({ error: { message, details } }, { status });
}
