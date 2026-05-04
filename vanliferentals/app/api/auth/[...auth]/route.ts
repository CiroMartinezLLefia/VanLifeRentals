import { NextResponse } from "next/server";

const message = "Auth.js not configured";

export async function GET() {
  return NextResponse.json({ error: { message } }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: { message } }, { status: 501 });
}
