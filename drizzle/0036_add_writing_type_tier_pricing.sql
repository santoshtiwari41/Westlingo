CREATE TABLE "writing_type_tier_pricing" (
  "id" serial PRIMARY KEY NOT NULL,
  "writing_type_id" integer NOT NULL REFERENCES "writing_types"("id"),
  "tier_id" integer NOT NULL REFERENCES "writing_tiers"("id"),
  "price" numeric(10, 2) NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
); 