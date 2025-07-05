CREATE TABLE "visa_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "writing" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"writing_type_id" integer NOT NULL,
	"tier_id" integer NOT NULL,
	"country" text NOT NULL,
	"visa_type_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"estimated_days" integer,
	"description" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "writing_tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "writing_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "writing" ADD CONSTRAINT "writing_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing" ADD CONSTRAINT "writing_writing_type_id_writing_types_id_fk" FOREIGN KEY ("writing_type_id") REFERENCES "public"."writing_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing" ADD CONSTRAINT "writing_tier_id_writing_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."writing_tiers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing" ADD CONSTRAINT "writing_visa_type_id_visa_types_id_fk" FOREIGN KEY ("visa_type_id") REFERENCES "public"."visa_types"("id") ON DELETE no action ON UPDATE no action;