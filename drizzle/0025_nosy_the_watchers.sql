ALTER TABLE "courses" ADD COLUMN "config" jsonb;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "size";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "cloudinary_config";