declare module "@ho/zero-schema" {
  export const schema: {
    readonly tables: {
      user: {
        name: "user";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly organisationId: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly email:
            | {
                optional: false;
                type: "string";
                customType: string;
              }
            | {
                optional: false;
                type: "string";
                customType: string;
                serverName: string;
              };
          readonly passwordHash: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly firstName: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly lastName: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly description:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly phoneNumber: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly avatarUrl: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly role:
            | {
                type: "string";
                customType: "user" | "admin" | "agent";
                optional: true;
              }
            | {
                type: "string";
                customType: "user" | "admin" | "agent";
                optional: true;
                serverName: string;
              };
          readonly isVerified: {
            type: "boolean";
            customType: boolean;
            optional: true;
            serverName: string;
          };
          readonly lastLogin: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      organisation: {
        name: "organisation";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly name:
            | {
                optional: false;
                type: "string";
                customType: string;
              }
            | {
                optional: false;
                type: "string";
                customType: string;
                serverName: string;
              };
          readonly description:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly slug:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly logoUrl: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      booking: {
        name: "booking";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly propertyId: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly destinationCalendarId: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly hostId: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly enquiryId: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly title:
            | {
                optional: false;
                type: "string";
                customType: string;
              }
            | {
                optional: false;
                type: "string";
                customType: string;
                serverName: string;
              };
          readonly description:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly date:
            | {
                optional: false;
                type: "number";
                customType: number;
              }
            | {
                optional: false;
                type: "number";
                customType: number;
                serverName: string;
              };
          readonly startTime: {
            optional: false;
            type: "number";
            customType: number;
            serverName: string;
          };
          readonly endTime: {
            optional: false;
            type: "number";
            customType: number;
            serverName: string;
          };
          readonly notes:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly responses:
            | {
                type: "json";
                customType: import("@rocicorp/zero").ReadonlyJSONValue;
                optional: true;
              }
            | {
                type: "json";
                customType: import("@rocicorp/zero").ReadonlyJSONValue;
                optional: true;
                serverName: string;
              };
          readonly status:
            | {
                type: "string";
                customType: "pending" | "completed" | "confirmed" | "cancelled";
                optional: true;
              }
            | {
                type: "string";
                customType: "pending" | "completed" | "confirmed" | "cancelled";
                optional: true;
                serverName: string;
              };
          readonly bookingType:
            | {
                type: "string";
                customType: "other" | "viewing" | "meeting";
                optional: true;
              }
            | {
                type: "string";
                customType: "other" | "viewing" | "meeting";
                optional: true;
                serverName: string;
              };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      property: {
        name: "property";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly organisationId: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly title:
            | {
                optional: false;
                type: "string";
                customType: string;
              }
            | {
                optional: false;
                type: "string";
                customType: string;
                serverName: string;
              };
          readonly description:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly propertyType:
            | {
                optional: false;
                type: "string";
                customType:
                  | "flat"
                  | "other"
                  | "detached"
                  | "semi-detached"
                  | "terraced"
                  | "bungalow";
              }
            | {
                optional: false;
                type: "string";
                customType:
                  | "flat"
                  | "other"
                  | "detached"
                  | "semi-detached"
                  | "terraced"
                  | "bungalow";
                serverName: string;
              };
          readonly saleType:
            | {
                optional: false;
                type: "string";
                customType: "sale" | "rent";
              }
            | {
                optional: false;
                type: "string";
                customType: "sale" | "rent";
                serverName: string;
              };
          readonly price:
            | {
                optional: false;
                type: "number";
                customType: number;
              }
            | {
                optional: false;
                type: "number";
                customType: number;
                serverName: string;
              };
          readonly bedrooms:
            | {
                optional: false;
                type: "number";
                customType: number;
              }
            | {
                optional: false;
                type: "number";
                customType: number;
                serverName: string;
              };
          readonly bathrooms:
            | {
                optional: false;
                type: "number";
                customType: number;
              }
            | {
                optional: false;
                type: "number";
                customType: number;
                serverName: string;
              };
          readonly squareFootage: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly tenure:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly councilTaxBand: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly addressLine1: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly addressLine2: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly city:
            | {
                optional: false;
                type: "string";
                customType: string;
              }
            | {
                optional: false;
                type: "string";
                customType: string;
                serverName: string;
              };
          readonly postcode:
            | {
                optional: false;
                type: "string";
                customType: string;
              }
            | {
                optional: false;
                type: "string";
                customType: string;
                serverName: string;
              };
          readonly county:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly features:
            | {
                type: "json";
                customType: import("@rocicorp/zero").ReadonlyJSONValue;
                optional: true;
              }
            | {
                type: "json";
                customType: import("@rocicorp/zero").ReadonlyJSONValue;
                optional: true;
                serverName: string;
              };
          readonly energyEfficiencyRating: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly status:
            | {
                type: "string";
                customType: "active" | "sold" | "agreed" | "draft";
                optional: true;
              }
            | {
                type: "string";
                customType: "active" | "sold" | "agreed" | "draft";
                optional: true;
                serverName: string;
              };
          readonly dateAvailable: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly listingDate: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      enquiry: {
        name: "enquiry";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly propertyId: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly userId: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly enquiryType: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly enquiryDetails: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly status:
            | {
                type: "string";
                customType: "pending" | "answered";
                optional: true;
              }
            | {
                type: "string";
                customType: "pending" | "answered";
                optional: true;
                serverName: string;
              };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      propertyImages: {
        name: "propertyImages";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly propertyId: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly imageUrl: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly isPrimaryImage: {
            type: "boolean";
            customType: boolean;
            optional: true;
            serverName: string;
          };
          readonly uploadedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      propertyDocuments: {
        name: "propertyDocuments";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly propertyId: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly documentType: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly documentUrl: {
            optional: false;
            type: "string";
            customType: string;
            serverName: string;
          };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
      userCalendar: {
        name: "userCalendar";
        primaryKey: any;
        columns: {
          readonly id:
            | {
                type: "string";
                customType: string;
                optional: true;
              }
            | {
                type: "string";
                customType: string;
                optional: true;
                serverName: string;
              };
          readonly userId: {
            type: "string";
            customType: string;
            optional: true;
            serverName: string;
          };
          readonly createdAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
          readonly updatedAt: {
            type: "number";
            customType: number;
            optional: true;
            serverName: string;
          };
        };
      };
    };
    readonly relationships: {
      user: {
        calendar: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt" | "userId")[];
            readonly destSchema: "userCalendar";
            readonly cardinality: "one";
          },
        ];
        organisation: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "name"
              | "id"
              | "description"
              | "slug"
              | "logoUrl"
              | "createdAt"
              | "updatedAt"
            )[];
            readonly destSchema: "organisation";
            readonly cardinality: "one";
          },
        ];
        enquiries: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "status"
              | "createdAt"
              | "updatedAt"
              | "userId"
              | "propertyId"
              | "enquiryType"
              | "enquiryDetails"
            )[];
            readonly destSchema: "enquiry";
            readonly cardinality: "many";
          },
        ];
      } & {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      organisation: {
        user: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "role"
              | "email"
              | "description"
              | "createdAt"
              | "updatedAt"
              | "organisationId"
              | "passwordHash"
              | "firstName"
              | "lastName"
              | "phoneNumber"
              | "avatarUrl"
              | "isVerified"
              | "lastLogin"
            )[];
            readonly destSchema: "user";
            readonly cardinality: "many";
          },
        ];
        properties: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "title"
              | "status"
              | "description"
              | "createdAt"
              | "updatedAt"
              | "organisationId"
              | "propertyType"
              | "saleType"
              | "price"
              | "bedrooms"
              | "bathrooms"
              | "squareFootage"
              | "tenure"
              | "councilTaxBand"
              | "addressLine1"
              | "addressLine2"
              | "city"
              | "postcode"
              | "county"
              | "features"
              | "energyEfficiencyRating"
              | "dateAvailable"
              | "listingDate"
            )[];
            readonly destSchema: "property";
            readonly cardinality: "many";
          },
        ];
      } & {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      booking: {
        host: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "role"
              | "email"
              | "description"
              | "createdAt"
              | "updatedAt"
              | "organisationId"
              | "passwordHash"
              | "firstName"
              | "lastName"
              | "phoneNumber"
              | "avatarUrl"
              | "isVerified"
              | "lastLogin"
            )[];
            readonly destSchema: "user";
            readonly cardinality: "one";
          },
        ];
        property: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "title"
              | "status"
              | "description"
              | "createdAt"
              | "updatedAt"
              | "organisationId"
              | "propertyType"
              | "saleType"
              | "price"
              | "bedrooms"
              | "bathrooms"
              | "squareFootage"
              | "tenure"
              | "councilTaxBand"
              | "addressLine1"
              | "addressLine2"
              | "city"
              | "postcode"
              | "county"
              | "features"
              | "energyEfficiencyRating"
              | "dateAvailable"
              | "listingDate"
            )[];
            readonly destSchema: "property";
            readonly cardinality: "one";
          },
        ];
        enquiry: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "status"
              | "createdAt"
              | "updatedAt"
              | "userId"
              | "propertyId"
              | "enquiryType"
              | "enquiryDetails"
            )[];
            readonly destSchema: "enquiry";
            readonly cardinality: "one";
          },
        ];
        destinationCalendar: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt" | "userId")[];
            readonly destSchema: "userCalendar";
            readonly cardinality: "one";
          },
        ];
      } & {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      property: {
        organisation: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "name"
              | "id"
              | "description"
              | "slug"
              | "logoUrl"
              | "createdAt"
              | "updatedAt"
            )[];
            readonly destSchema: "organisation";
            readonly cardinality: "one";
          },
        ];
        booking: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "endTime"
              | "startTime"
              | "id"
              | "title"
              | "status"
              | "description"
              | "date"
              | "createdAt"
              | "updatedAt"
              | "propertyId"
              | "destinationCalendarId"
              | "hostId"
              | "enquiryId"
              | "notes"
              | "responses"
              | "bookingType"
            )[];
            readonly destSchema: "booking";
            readonly cardinality: "many";
          },
        ];
        enquiries: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "status"
              | "createdAt"
              | "updatedAt"
              | "userId"
              | "propertyId"
              | "enquiryType"
              | "enquiryDetails"
            )[];
            readonly destSchema: "enquiry";
            readonly cardinality: "many";
          },
        ];
        images: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "createdAt"
              | "updatedAt"
              | "propertyId"
              | "imageUrl"
              | "isPrimaryImage"
              | "uploadedAt"
            )[];
            readonly destSchema: "propertyImages";
            readonly cardinality: "many";
          },
        ];
        documents: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "createdAt"
              | "updatedAt"
              | "propertyId"
              | "documentType"
              | "documentUrl"
            )[];
            readonly destSchema: "propertyDocuments";
            readonly cardinality: "many";
          },
        ];
      } & {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      enquiry: {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      propertyImages: {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      propertyDocuments: {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
      userCalendar: {
        user: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "id"
              | "role"
              | "email"
              | "description"
              | "createdAt"
              | "updatedAt"
              | "organisationId"
              | "passwordHash"
              | "firstName"
              | "lastName"
              | "phoneNumber"
              | "avatarUrl"
              | "isVerified"
              | "lastLogin"
            )[];
            readonly destSchema: "user";
            readonly cardinality: "one";
          },
        ];
        bookings: [
          {
            readonly sourceField: string[];
            readonly destField: (
              | "endTime"
              | "startTime"
              | "id"
              | "title"
              | "status"
              | "description"
              | "date"
              | "createdAt"
              | "updatedAt"
              | "propertyId"
              | "destinationCalendarId"
              | "hostId"
              | "enquiryId"
              | "notes"
              | "responses"
              | "bookingType"
            )[];
            readonly destSchema: "booking";
            readonly cardinality: "many";
          },
        ];
      } & {
        readonly [x: string]: [
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
          {
            readonly sourceField: string[];
            readonly destField: ("id" | "createdAt" | "updatedAt")[];
            readonly destSchema:
              | "user"
              | "organisation"
              | "booking"
              | "property"
              | "enquiry"
              | "propertyImages"
              | "propertyDocuments"
              | "userCalendar";
            readonly cardinality: "many";
          },
        ];
      };
    };
  };
  export type Schema = typeof schema;
  export const permissions: Promise<{
    [x: string]: unknown;
    tables: Record<
      string,
      {
        row?:
          | {
              select?:
                | ["allow", import("@rocicorp/zero").Condition][]
                | undefined;
              insert?:
                | ["allow", import("@rocicorp/zero").Condition][]
                | undefined;
              update?:
                | {
                    preMutation?:
                      | ["allow", import("@rocicorp/zero").Condition][]
                      | undefined;
                    postMutation?:
                      | ["allow", import("@rocicorp/zero").Condition][]
                      | undefined;
                  }
                | undefined;
              delete?:
                | ["allow", import("@rocicorp/zero").Condition][]
                | undefined;
            }
          | undefined;
        cell?:
          | Record<
              string,
              {
                select?:
                  | ["allow", import("@rocicorp/zero").Condition][]
                  | undefined;
                insert?:
                  | ["allow", import("@rocicorp/zero").Condition][]
                  | undefined;
                update?:
                  | {
                      preMutation?:
                        | ["allow", import("@rocicorp/zero").Condition][]
                        | undefined;
                      postMutation?:
                        | ["allow", import("@rocicorp/zero").Condition][]
                        | undefined;
                    }
                  | undefined;
                delete?:
                  | ["allow", import("@rocicorp/zero").Condition][]
                  | undefined;
              }
            >
          | undefined;
      }
    >;
  }>;
}
