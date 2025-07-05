ALTER TABLE "course_carousel_items" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "course_carousel_items" ADD COLUMN "is_active" boolean DEFAULT false NOT NULL;