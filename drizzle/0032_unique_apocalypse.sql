CREATE TABLE "course_type_pricing" (
	"id" text PRIMARY KEY NOT NULL,
	"course_id" text NOT NULL,
	"type" text NOT NULL,
	"tier" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"features" text[] DEFAULT '{}' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_type_pricing" ADD CONSTRAINT "course_type_pricing_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;