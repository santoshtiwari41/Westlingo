ALTER TABLE "course_carousel_items" RENAME COLUMN "image_url" TO "url";--> statement-breakpoint
ALTER TABLE "course_carousel_items" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "course_carousel_items" ADD COLUMN "size" numeric;--> statement-breakpoint
ALTER TABLE "course_carousel_items" ADD COLUMN "type" numeric;