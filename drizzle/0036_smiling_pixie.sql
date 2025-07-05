CREATE TABLE "writing_type_tier_pricing" (
	"id" serial PRIMARY KEY NOT NULL,
	"writing_type_id" integer NOT NULL,
	"tier_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "writing_type_tier_pricing" ADD CONSTRAINT "writing_type_tier_pricing_writing_type_id_writing_types_id_fk" FOREIGN KEY ("writing_type_id") REFERENCES "public"."writing_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "writing_type_tier_pricing" ADD CONSTRAINT "writing_type_tier_pricing_tier_id_writing_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."writing_tiers"("id") ON DELETE no action ON UPDATE no action;