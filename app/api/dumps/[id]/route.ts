import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise < { id: string } >}
) {
  const { id } = await params;
  const dumpId = parseInt(id);
  await db.dump.delete({
    where: { id: dumpId }
  });
  return NextResponse.json({ success: true });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise < { id: string } >}
    ) {
        const { id} = await params;
        const dumpId = parseInt(id);
        const dump = await db.dump.update({
            where: { id: dumpId },
            data: {done: true}
        });
        return NextResponse.json(dump);
    }