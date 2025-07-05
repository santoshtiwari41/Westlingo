ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_mock_test_id_unique" UNIQUE("mock_test_id");--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_preparation_class_id_unique" UNIQUE("preparation_class_id");--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_test_booking_id_unique" UNIQUE("test_booking_id");--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_mock_test_id_unique" UNIQUE("mock_test_id");--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_preparation_class_id_unique" UNIQUE("preparation_class_id");--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_test_booking_id_unique" UNIQUE("test_booking_id");--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_mock_test_id_unique" UNIQUE("mock_test_id");--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_preparation_class_id_unique" UNIQUE("preparation_class_id");--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_test_booking_id_unique" UNIQUE("test_booking_id");