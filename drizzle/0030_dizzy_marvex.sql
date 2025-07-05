CREATE TABLE "reservation_slots" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "reservation_type" DEFAULT 'preparation_class' NOT NULL,
	"course_id" text NOT NULL,
	"date" date NOT NULL,
	"time" text NOT NULL,
	"seats" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reservation_slots" ADD CONSTRAINT "reservation_slots_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;