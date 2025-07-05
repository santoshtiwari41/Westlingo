ALTER TABLE "testimonials" ADD COLUMN "type" text DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "testimonials" ADD COLUMN "mock_test_id" text;--> statement-breakpoint
ALTER TABLE "testimonials" ADD COLUMN "preparation_class_id" text;--> statement-breakpoint
ALTER TABLE "testimonials" ADD COLUMN "test_booking_id" text;--> statement-breakpoint
ALTER TABLE "testimonials" ADD COLUMN "course_id" text;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_mock_test_id_course_mock_tests_id_fk" FOREIGN KEY ("mock_test_id") REFERENCES "public"."course_mock_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_preparation_class_id_course_preparation_classes_id_fk" FOREIGN KEY ("preparation_class_id") REFERENCES "public"."course_preparation_classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_test_booking_id_course_test_bookings_id_fk" FOREIGN KEY ("test_booking_id") REFERENCES "public"."course_test_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint