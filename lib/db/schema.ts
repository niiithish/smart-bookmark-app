
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// This table mimics the Supabase auth.users table in the public schema
// allowing you to add application-specific user data.
// In a real Supabase setup, you might use a trigger to auto-create this.
export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey(), // This should match auth.users(id)
    name: text("name"),
    email: text("email"),
    avatarUrl: text("avatar_url"),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
