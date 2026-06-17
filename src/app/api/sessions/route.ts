import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allSessions = await db.select().from(sessions);
    return NextResponse.json(allSessions);
  } catch (e) {
    console.error("GET /api/sessions error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, kart, datetime, laps, laptime, ratings, issues, notes } = body;
    await db.insert(sessions).values({
      id,
      kart,
      datetime,
      laps,
      laptime: laptime || null,
      ratings,
      issues: issues || [],
      notes: notes || "",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/sessions error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const kart = searchParams.get("kart");

    if (id) {
      await db.delete(sessions).where(eq(sessions.id, parseInt(id)));
    } else if (kart) {
      await db.delete(sessions).where(eq(sessions.kart, parseInt(kart)));
    } else {
      return NextResponse.json({ error: "Missing id or kart" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/sessions error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
