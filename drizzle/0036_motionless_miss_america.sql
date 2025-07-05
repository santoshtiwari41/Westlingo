ALTER TABLE "course_pricings" RENAME COLUMN "benefitsUrl" TO "benefits_url";--> statement-breakpoint
ALTER TABLE "course_mock_tests" ADD COLUMN "video_url" text DEFAULT 'https://www.youtube.com/embed/zojh-_mJP2E?si=vPDhvLzRBtEj8fFI' NOT NULL;--> statement-breakpoint
ALTER TABLE "course_preparation_classes" ADD COLUMN "video_url" text DEFAULT 'https://www.youtube.com/embed/zojh-_mJP2E?si=vPDhvLzRBtEj8fFI' NOT NULL;--> statement-breakpoint
ALTER TABLE "course_test_bookings" ADD COLUMN "video_url" text DEFAULT 'https://www.youtube.com/embed/zojh-_mJP2E?si=vPDhvLzRBtEj8fFI' NOT NULL;