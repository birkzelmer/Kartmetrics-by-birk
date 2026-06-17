import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eliteKarts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const all = await db.select().from(eliteKarts);
    const karts = all.map((r) => r.kart).sort((a, b) => a - b);
    return NextResponse.json(karts);
  } catch (e) {
    console.error("GET /api/elite error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { kart } = await req.json();
    await db.insert(eliteKarts).values({ kart }).onConflictDoNothing();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/elite error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const kart = searchParams.get("kart");
    if (!kart) return NextResponse.json({ error: "Missing kart" }, { status: 400 });
    await db.delete(eliteKarts).where(eq(eliteKarts.kart, parseInt(kart)));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/elite error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
