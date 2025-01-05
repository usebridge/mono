import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  json,
  jsonb,
  numeric,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// We handle the tables with a prefix to enable us to potentially have multiple
// databases on the one connection. Cost saving for the time being, can be migrated
// accordingly at a later date
const pgTable = pgTableCreator((name: string) => `bridge_${name}`);

const timestampHelper = () => ({
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// TODO: Implement "feedback" table that users can provide feedback from
//
// TODO: Consider users that don't belong to an organisation and are just going to be viewing
// properties and not managing them

// TODO: Investigate whether we actually need some of the contents of this users table if we
// use a separate auth management system (thinking new SST setup)

export const organisation = pgTable("organisation", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  // Slug will be used for short URL's in the future
  slug: text("slug"),
  logoUrl: text("logo_url"),

  // TODO: Consider a timezone field for organisations that can help with Locales
  // TOOD: Week start value also

  ...timestampHelper(),
});

export const userPermissionEnum = pgEnum("user_permission", [
  "admin",
  "agent",
  "user",
]);

// User Management
export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organisationId: uuid("organisation_id")
    .references(() => organisation.id)
    .notNull(),

  email: text("email").unique().notNull(),
  // FIX: This is probably one of the items to remove. Ideally we don't deal with auth
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  description: text("description"),
  phoneNumber: text("phone_number"),
  avatarUrl: text("avatar_url"),
  role: userPermissionEnum("role"),

  isVerified: boolean("is_verified").default(false),
  lastLogin: timestamp("last_login"),

  ...timestampHelper(),
});

// User Calendar
export const userCalendar = pgTable(
  "user_calendar",
  {
    id: uuid("id").defaultRandom(),
    userId: uuid("user_id").references(() => user.id),

    ...timestampHelper(),
  },
  (table) => [{ pk: primaryKey({ columns: [table.id, table.userId] }) }],
);

const statusEnum = pgEnum("status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);
const bookingTypeEnum = pgEnum("booking_type", ["viewing", "meeting", "other"]);

export const booking = pgTable("booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => property.id),
  destinationCalendarId: uuid("destination_calendar_id")
    .references(() => userCalendar.id)
    .notNull(),
  hostId: uuid("host_id").references(() => user.id),

  title: text("title").notNull(),
  description: text("description"),

  date: date("date").notNull(),
  startTime: date("date").notNull(),
  endTime: date("date").notNull(),
  notes: text("notes"),

  responses: json("responses").$type<{ userId: string; response: string }[]>(),

  status: statusEnum("status").default("pending"),
  bookingType: bookingTypeEnum("booking_type").default("viewing"),

  ...timestampHelper(),
});

const propertyStatusEnum = pgEnum("property_status", [
  "active",
  "sold",
  "draft",
]);
const propertyTypeEnum = pgEnum("property_type", [
  "detached",
  "semi-detached",
  "terraced",
  "flat",
  "bungalow",
  "other",
]);
const saleTypeEnum = pgEnum("sale_type", ["sale", "rent"]);

// Property Listing
export const property = pgTable("property", {
  id: uuid("id").primaryKey().defaultRandom(),
  organisationId: uuid("organisation_id")
    .references(() => organisation.id)
    .notNull(),

  title: text("title").notNull(),
  description: text("description"),
  propertyType: propertyTypeEnum("property_type").notNull(),
  saleType: saleTypeEnum("sale_type").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  squareFootage: numeric("square_footage", { precision: 10, scale: 2 }),
  tenure: text("tenure"),
  councilTaxBand: text("council_tax_band"),

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
  status: propertyStatusEnum("status").default("draft"),
  dateAvailable: date("date_available"),
  listingDate: date("listing_date"),

  ...timestampHelper(),
});

// Property Images
export const propertyImages = pgTable("property_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id")
    .references(() => property.id)
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
    .references(() => property.id)
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

export const organisationRelations = relations(organisation, ({ many }) => ({
  user: many(user),
  properties: many(property),
}));

export const userRelations = relations(user, ({ one }) => ({
  calendar: one(userCalendar),
  organisation: one(organisation, {
    fields: [user.organisationId],
    references: [organisation.id],
  }),
}));

export const userCalendarRelations = relations(
  userCalendar,
  ({ one, many }) => ({
    user: one(user, {
      fields: [userCalendar.userId],
      references: [user.id],
    }),

    bookings: many(booking),
  }),
);

export const bookingRelations = relations(booking, ({ one, many }) => ({
  property: one(property, {
    fields: [booking.propertyId],
    references: [property.id],
  }),
  destinationCalendar: one(userCalendar, {
    fields: [booking.destinationCalendarId],
    references: [userCalendar.id],
  }),
  host: one(user, {
    fields: [booking.hostId],
    references: [user.id],
  }),

  attendees: many(user),
}));

export const propertyRelations = relations(property, ({ one, many }) => ({
  images: many(propertyImages),
  documents: many(propertyDocuments),
  booking: many(booking),

  organisation: one(organisation, {
    fields: [property.organisationId],
    references: [organisation.id],
  }),
}));
