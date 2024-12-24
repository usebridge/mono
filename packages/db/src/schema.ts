import {
  pgTable,
  text,
  timestamp,
  boolean,
  numeric,
  jsonb,
  uuid,
  integer,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User Management
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number"),
  role: text("role")
    .default("user")
    .$type<"admin" | "agent" | "user">()
    .notNull(),
  isVerified: boolean("is_verified").default(false),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Agent Profile Extension
export const agentProfiles = pgTable("agent_profiles", {
  userId: uuid("user_id")
    .references(() => users.id)
    .primaryKey(),
  companyName: text("company_name"),
  licenseNumber: text("license_number"),
  specializations: text("specializations").array(),
  profileImageUrl: text("profile_image_url"),
});

// Property Listing
export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  agentId: uuid("agent_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  propertyType: text("property_type")
    .$type<
      "detached" | "semi-detached" | "terraced" | "flat" | "bungalow" | "other"
    >()
    .notNull(),
  saleType: text("sale_type").$type<"sale" | "rent">().notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  squareFootage: numeric("square_footage", { precision: 10, scale: 2 }),

  // Address Details
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  postcode: text("postcode").notNull(),
  county: text("county"),

  // Property Features
  features: jsonb("features").$type<string[]>(),
  energyEfficiencyRating: integer("energy_efficiency_rating"),

  // Status and Listing Details
  status: text("status")
    .$type<"active" | "sold" | "under_offer" | "draft">()
    .default("draft"),
  dateAvailable: date("date_available"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Property Images
export const propertyImages = pgTable("property_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id")
    .references(() => properties.id)
    .notNull(),
  imageUrl: text("image_url").notNull(),
  isPrimaryImage: boolean("is_primary_image").default(false),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Viewing Bookings
export const viewings = pgTable("viewings", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id")
    .references(() => properties.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  preferredDate: date("preferred_date").notNull(),
  preferredTimeSlot: text("preferred_time_slot")
    .$type<"morning" | "afternoon" | "evening">()
    .notNull(),
  status: text("status")
    .$type<"pending" | "confirmed" | "completed" | "cancelled">()
    .default("pending"),
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relation Definitions
export const userRelations = relations(users, ({ one, many }) => ({
  agentProfile: one(agentProfiles, {
    fields: [users.id],
    references: [agentProfiles.userId],
  }),
  properties: many(properties),
  viewings: many(viewings),
}));

export const propertyRelations = relations(properties, ({ one, many }) => ({
  agent: one(users, {
    fields: [properties.agentId],
    references: [users.id],
  }),
  images: many(propertyImages),
  viewings: many(viewings),
}));
