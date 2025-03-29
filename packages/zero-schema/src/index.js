var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// zero/zero-schema.ts
import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";
import { createZeroSchema } from "drizzle-zero";

// src/schema.ts
var exports_schema = {};
__export(exports_schema, {
  userRelations: () => userRelations,
  userPermissionEnum: () => userPermissionEnum,
  userCalendarRelations: () => userCalendarRelations,
  userCalendar: () => userCalendar,
  user: () => user,
  statusEnum: () => statusEnum,
  saleTypeEnum: () => saleTypeEnum,
  propertyTypeEnum: () => propertyTypeEnum,
  propertyStatusEnum: () => propertyStatusEnum,
  propertyRelations: () => propertyRelations,
  propertyImages: () => propertyImages,
  propertyDocuments: () => propertyDocuments,
  property: () => property,
  organisationRelations: () => organisationRelations,
  organisation: () => organisation,
  enquiryStatusEnum: () => enquiryStatusEnum,
  enquiry: () => enquiry,
  bookingTypeEnum: () => bookingTypeEnum,
  bookingRelations: () => bookingRelations,
  booking: () => booking
});
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
  uuid
} from "drizzle-orm/pg-core";
var pgTable = pgTableCreator((name) => `bridge_${name}`);
var timestampHelper = () => ({
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var organisation = pgTable("organisation", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug"),
  logoUrl: text("logo_url"),
  ...timestampHelper()
});
var userPermissionEnum = pgEnum("user_permission", [
  "admin",
  "agent",
  "user"
]);
var user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organisationId: uuid("organisation_id").references(() => organisation.id).notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  description: text("description"),
  phoneNumber: text("phone_number"),
  avatarUrl: text("avatar_url"),
  role: userPermissionEnum(),
  isVerified: boolean("is_verified").default(false),
  lastLogin: timestamp("last_login"),
  ...timestampHelper()
});
var userCalendar = pgTable("user_calendar", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => user.id),
  ...timestampHelper()
}, (table) => [{ pk: primaryKey({ columns: [table.id, table.userId] }) }]);
var statusEnum = pgEnum("status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled"
]);
var bookingTypeEnum = pgEnum("booking_type", [
  "viewing",
  "meeting",
  "other"
]);
var booking = pgTable("booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => property.id),
  destinationCalendarId: uuid("destination_calendar_id").references(() => userCalendar.id).notNull(),
  hostId: uuid("host_id").references(() => user.id),
  enquiryId: uuid("enquiry_id").references(() => enquiry.id),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  startTime: date("start_time").notNull(),
  endTime: date("end_time").notNull(),
  notes: text("notes"),
  responses: json("responses").$type(),
  status: statusEnum().default("pending"),
  bookingType: bookingTypeEnum().default("viewing"),
  ...timestampHelper()
});
var enquiryStatusEnum = pgEnum("enquiry_status", [
  "pending",
  "answered"
]);
var enquiry = pgTable("enquiry", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => property.id),
  userId: uuid("user_id").references(() => user.id),
  enquiryType: text("enquiry_type").notNull(),
  enquiryDetails: text("enquiry_details"),
  status: enquiryStatusEnum().default("pending"),
  ...timestampHelper()
});
var propertyStatusEnum = pgEnum("property_status", [
  "active",
  "sold",
  "agreed",
  "draft"
]);
var propertyTypeEnum = pgEnum("property_type", [
  "detached",
  "semi-detached",
  "terraced",
  "flat",
  "bungalow",
  "other"
]);
var saleTypeEnum = pgEnum("sale_type", ["sale", "rent"]);
var property = pgTable("property", {
  id: uuid("id").primaryKey().defaultRandom(),
  organisationId: uuid("organisation_id").references(() => organisation.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  propertyType: propertyTypeEnum().notNull(),
  saleType: saleTypeEnum().notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  squareFootage: numeric("square_footage", { precision: 10, scale: 2 }),
  tenure: text("tenure"),
  councilTaxBand: text("council_tax_band"),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  postcode: text("postcode").notNull(),
  county: text("county"),
  features: jsonb("features").$type(),
  energyEfficiencyRating: text("energy_efficiency_rating"),
  status: propertyStatusEnum().default("draft"),
  dateAvailable: date("date_available"),
  listingDate: date("listing_date"),
  ...timestampHelper()
});
var propertyImages = pgTable("property_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => property.id).notNull(),
  imageUrl: text("image_url").notNull(),
  isPrimaryImage: boolean("is_primary_image").default(false),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  ...timestampHelper()
});
var propertyDocuments = pgTable("property_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => property.id).notNull(),
  documentType: text("document_type").$type().notNull(),
  documentUrl: text("document_url").notNull(),
  ...timestampHelper()
});
var organisationRelations = relations(organisation, ({ many }) => ({
  user: many(user),
  properties: many(property)
}));
var userRelations = relations(user, ({ one, many }) => ({
  calendar: one(userCalendar),
  organisation: one(organisation, {
    fields: [user.organisationId],
    references: [organisation.id]
  }),
  enquiries: many(enquiry)
}));
var userCalendarRelations = relations(userCalendar, ({ one, many }) => ({
  user: one(user, {
    fields: [userCalendar.userId],
    references: [user.id]
  }),
  bookings: many(booking)
}));
var bookingRelations = relations(booking, ({ one }) => ({
  property: one(property, {
    fields: [booking.propertyId],
    references: [property.id]
  }),
  destinationCalendar: one(userCalendar, {
    fields: [booking.destinationCalendarId],
    references: [userCalendar.id]
  }),
  host: one(user, {
    fields: [booking.hostId],
    references: [user.id]
  }),
  enquiry: one(enquiry, {
    fields: [booking.enquiryId],
    references: [enquiry.id]
  })
}));
var propertyRelations = relations(property, ({ one, many }) => ({
  organisation: one(organisation, {
    fields: [property.organisationId],
    references: [organisation.id]
  }),
  images: many(propertyImages),
  documents: many(propertyDocuments),
  booking: many(booking),
  enquiries: many(enquiry)
}));

// zero/zero-schema.ts
var schema = createZeroSchema(exports_schema, {
  tables: {
    property: {
      id: true,
      organisationId: true,
      title: true,
      description: true,
      propertyType: true,
      saleType: true,
      price: true,
      bedrooms: true,
      bathrooms: true,
      squareFootage: true,
      tenure: true,
      councilTaxBand: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      postcode: true,
      county: true,
      features: true,
      energyEfficiencyRating: true,
      status: true,
      dateAvailable: true,
      listingDate: true,
      createdAt: true,
      updatedAt: true
    },
    propertyImages: {
      id: true,
      propertyId: true,
      imageUrl: true,
      isPrimaryImage: true,
      uploadedAt: true,
      createdAt: true,
      updatedAt: true
    },
    propertyDocuments: {
      id: true,
      propertyId: true,
      documentType: true,
      documentUrl: true,
      createdAt: true,
      updatedAt: true
    },
    booking: {
      id: true,
      propertyId: true,
      destinationCalendarId: true,
      hostId: true,
      enquiryId: true,
      title: true,
      description: true,
      date: true,
      startTime: true,
      endTime: true,
      notes: true,
      responses: true,
      status: true,
      bookingType: true,
      createdAt: true,
      updatedAt: true
    },
    enquiry: {
      id: true,
      propertyId: true,
      userId: true,
      enquiryType: true,
      enquiryDetails: true,
      status: true,
      createdAt: true,
      updatedAt: true
    },
    organisation: {
      id: true,
      name: true,
      description: true,
      slug: true,
      logoUrl: true,
      createdAt: true,
      updatedAt: true
    },
    user: {
      id: true,
      organisationId: true,
      email: true,
      passwordHash: true,
      firstName: true,
      lastName: true,
      description: true,
      phoneNumber: true,
      avatarUrl: true,
      role: true,
      isVerified: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    },
    userCalendar: {
      id: true,
      userId: true,
      createdAt: true,
      updatedAt: true
    }
  }
});
var permissions = definePermissions(schema, () => {
  return {
    organisation: ANYONE_CAN_DO_ANYTHING,
    user: ANYONE_CAN_DO_ANYTHING,
    userCalendar: ANYONE_CAN_DO_ANYTHING,
    property: ANYONE_CAN_DO_ANYTHING,
    propertyImages: ANYONE_CAN_DO_ANYTHING,
    propertyDocuments: ANYONE_CAN_DO_ANYTHING,
    booking: ANYONE_CAN_DO_ANYTHING,
    enquiry: ANYONE_CAN_DO_ANYTHING
  };
});
export {
  schema,
  permissions
};
