import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
  const dumps = await db.dump.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(dumps);
}

export async function POST(request: Request) {
  const body = await request.json();
  const dump = await db.dump.create({
    data: { text: body.text }
  });
  return NextResponse.json(dump);
}