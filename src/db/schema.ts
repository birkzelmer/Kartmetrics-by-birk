import { pgTable, bigint, integer, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  kart: integer("kart").notNull(),
  datetime: text("datetime").notNull(),
  laps: integer("laps").notNull(),
  laptime: text("laptime"),
  ratings: jsonb("ratings").notNull(),
  issues: jsonb("issues").notNull().default([]),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const eliteKarts = pgTable("elite_karts", {
  kart: integer("kart").primaryKey(),
});
