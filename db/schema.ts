import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Trip enquiries submitted through the Contact page form.
// Run `npm run db:generate` then `npm run db:push` after setting DATABASE_URL.
export const contactEnquiries = pgTable("contact_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  destination: text("destination"),
  month: text("month"),
  travelers: text("travelers"),
  reference: text("reference"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
