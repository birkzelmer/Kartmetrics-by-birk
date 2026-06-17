import { NextResponse } from "next/server";
import { db } from "@/db";
import { sessions, eliteKarts } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allSessions = await db.select().from(sessions);
    const allElite = await db.select().from(eliteKarts);
    const eliteList = allElite.map((r) => r.kart).sort((a, b) => a - b);

    // Generate a simple hash based on data content
    const hash = simpleHash(JSON.stringify({ sessions: allSessions, elite: eliteList }));

    return NextResponse.json({
      sessions: allSessions,
      elite: eliteList,
      hash,
    });
  } catch (e) {
    console.error("GET /api/sync error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}
