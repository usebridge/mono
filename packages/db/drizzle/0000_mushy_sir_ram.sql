CREATE TYPE "public"."booking_type" AS ENUM('viewing', 'meeting', 'other');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('pending', 'answered');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('active', 'sold', 'agreed', 'draft');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('detached', 'semi-detached', 'terraced', 'flat', 'bungalow', 'other');--> statement-breakpoint
CREATE TYPE "public"."sale_type" AS ENUM('sale', 'rent');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_permission" AS ENUM('admin', 'agent', 'user');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_booking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"destination_calendar_id" uuid NOT NULL,
	"host_id" uuid,
	"enquiry_id" uuid,
	"title" text NOT NULL,
	"description" text,
	"date" date NOT NULL,
	"notes" text,
	"responses" json,
	"status" "status" DEFAULT 'pending',
	"bookingType" "booking_type" DEFAULT 'viewing',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_enquiry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"user_id" uuid,
	"enquiry_type" text NOT NULL,
	"enquiry_details" text,
	"status" "enquiry_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_organisation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"slug" text,
	"logo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"propertyType" "property_type" NOT NULL,
	"saleType" "sale_type" NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"square_footage" numeric(10, 2),
	"tenure" text,
	"council_tax_band" text,
	"address_line1" text NOT NULL,
	"address_line2" text,
	"city" text NOT NULL,
	"postcode" text NOT NULL,
	"county" text,
	"features" jsonb,
	"energy_efficiency_rating" text,
	"status" "property_status" DEFAULT 'draft',
	"date_available" date,
	"listing_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_property_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"document_type" text NOT NULL,
	"document_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_property_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"is_primary_image" boolean DEFAULT false,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"description" text,
	"phone_number" text,
	"avatar_url" text,
	"role" "user_permission",
	"is_verified" boolean DEFAULT false,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bridge_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bridge_user_calendar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_booking" ADD CONSTRAINT "bridge_booking_property_id_bridge_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."bridge_property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_booking" ADD CONSTRAINT "bridge_booking_destination_calendar_id_bridge_user_calendar_id_fk" FOREIGN KEY ("destination_calendar_id") REFERENCES "public"."bridge_user_calendar"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_booking" ADD CONSTRAINT "bridge_booking_host_id_bridge_users_id_fk" FOREIGN KEY ("host_id") REFERENCES "public"."bridge_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_booking" ADD CONSTRAINT "bridge_booking_enquiry_id_bridge_enquiry_id_fk" FOREIGN KEY ("enquiry_id") REFERENCES "public"."bridge_enquiry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_enquiry" ADD CONSTRAINT "bridge_enquiry_property_id_bridge_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."bridge_property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_enquiry" ADD CONSTRAINT "bridge_enquiry_user_id_bridge_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bridge_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_property" ADD CONSTRAINT "bridge_property_organisation_id_bridge_organisation_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."bridge_organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_property_documents" ADD CONSTRAINT "bridge_property_documents_property_id_bridge_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."bridge_property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_property_images" ADD CONSTRAINT "bridge_property_images_property_id_bridge_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."bridge_property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_users" ADD CONSTRAINT "bridge_users_organisation_id_bridge_organisation_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."bridge_organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bridge_user_calendar" ADD CONSTRAINT "bridge_user_calendar_user_id_bridge_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bridge_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
