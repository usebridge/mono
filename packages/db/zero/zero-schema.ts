/**
 * This file is bundled via esbuild in order to allow us to use this on client
 * without hitting any node only modules (such as drizzle-orm and it's pg related drivers)
 * It's consumed from within `packages/zero-schema`. On drizzle schema generation we run the build
 * and update/copy the built schema file into the zero package without any of the dependencies
 * from this db package being included.
 */
import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";
import { createZeroSchema } from "drizzle-zero";
import * as dbSchema from "../src/schema";

export const schema = createZeroSchema(dbSchema, {
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
      updatedAt: true,
    },
    propertyImages: {
      id: true,
      propertyId: true,
      imageUrl: true,
      isPrimaryImage: true,
      uploadedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    propertyDocuments: {
      id: true,
      propertyId: true,
      documentType: true,
      documentUrl: true,
      createdAt: true,
      updatedAt: true,
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
      updatedAt: true,
    },
    enquiry: {
      id: true,
      propertyId: true,
      userId: true,
      enquiryType: true,
      enquiryDetails: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    organisation: {
      id: true,
      name: true,
      description: true,
      slug: true,
      logoUrl: true,
      createdAt: true,
      updatedAt: true,
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
      updatedAt: true,
    },
    userCalendar: {
      id: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  },
});

export type Schema = typeof schema;

export const permissions = definePermissions(schema, () => {
  return {
    // TODO: Fine grained permissions
    organisation: ANYONE_CAN_DO_ANYTHING,
    user: ANYONE_CAN_DO_ANYTHING,
    userCalendar: ANYONE_CAN_DO_ANYTHING,
    property: ANYONE_CAN_DO_ANYTHING,
    propertyImages: ANYONE_CAN_DO_ANYTHING,
    propertyDocuments: ANYONE_CAN_DO_ANYTHING,
    booking: ANYONE_CAN_DO_ANYTHING,
    enquiry: ANYONE_CAN_DO_ANYTHING,
  };
});
