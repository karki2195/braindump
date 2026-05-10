import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  await db.dump.delete({
    where: { id }
  });
  return NextResponse.json({ success: true });
}