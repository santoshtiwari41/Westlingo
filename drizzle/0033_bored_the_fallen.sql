CREATE TABLE "payment_qr" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"uploaded_by" text
);
--> statement-breakpoint
ALTER TABLE "course_mock_tests" ADD CONSTRAINT "course_mock_tests_course_id_unique" UNIQUE("course_id");--> statement-breakpoint
ALTER TABLE "course_preparation_classes" ADD CONSTRAINT "course_preparation_classes_course_id_unique" UNIQUE("course_id");--> statement-breakpoint
ALTER TABLE "course_test_bookings" ADD CONSTRAINT "course_test_bookings_course_id_unique" UNIQUE("course_id");