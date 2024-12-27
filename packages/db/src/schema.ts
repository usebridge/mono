import {
  pgTableCreator,
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

// We handle the tables with a prefix to enable us to potentially have multiple
// databases on the one connection. Cost saving for the time being, can be migrated
// accordingly at a later date
const pgTable = pgTableCreator((name: string) => `bridge_${name}`);

const timestampHelper = () => ({
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// TODO: Investigate whether we actually need some of the contents of this users table if we
// use a separate auth management system (thinking new SST setup)

// User Management
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  // FIX: This is probably one of the items to remove. Ideally we don't deal with auth
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number"),
  role: text("role")
    .default("user")
    // TODO: Investigate the correct roles that we want for the system and consider permissions at a later date
    .$type<"admin" | "agent" | "user">()
    .notNull(),
  isVerified: boolean("is_verified").default(false),
  lastLogin: timestamp("last_login"),

  ...timestampHelper(),
});

// Agent Profile Extension
export const agentProfiles = pgTable("agent_profiles", {
  userId: uuid("user_id")
    .references(() => users.id)
    .primaryKey(),
  companyName: text("company_name"),
  // TODO: Claude came up with this. I doubt a license number is needed
  licenseNumber: text("license_number"),
  // TODO: Similar to above, may not be required. We'd probably want an agent company with a description
  // that matches accordingly
  specializations: text("specializations").array(),
  profileImageUrl: text("profile_image_url"),

  ...timestampHelper(),
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
  // TODO: This should be an enum right?
  energyEfficiencyRating: integer("energy_efficiency_rating"),

  // Status and Listing Details
  status: text("status")
    .$type<"active" | "sold" | "under_offer" | "draft">()
    .default("draft"),
  dateAvailable: date("date_available"),

  ...timestampHelper(),
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

  ...timestampHelper(),
});

// Property documents
export const propertyDocuments = pgTable("property_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id")
    .references(() => properties.id)
    .notNull(),
  documentType: text("document_type")
    .$type<
      | "contract"
      | "lease"
      | "rent_agreement"
      | "other"
      | "maintenance"
      | "inspection"
      | "purchase_order"
    >()
    .notNull(),
  documentUrl: text("document_url").notNull(),

  ...timestampHelper(),
});

// TODO: This need to account for times and not just prefferred dates and time slots being generic
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

  ...timestampHelper(),
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
  // Property information
  images: many(propertyImages),
  documents: many(propertyDocuments),

  // Relating booking / viewing / agent info
  agent: one(users, {
    fields: [properties.agentId],
    references: [users.id],
  }),
  viewings: many(viewings),
}));
