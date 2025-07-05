CREATE TABLE "course_carousel_items" (
	"id" text PRIMARY KEY NOT NULL,
	"app_id" text NOT NULL,
	"image_url" text NOT NULL,
	"carousel_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_faq_items" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"faq_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_pricing_features" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"features" text[] NOT NULL,
	"price" numeric(10, 2) DEFAULT '100.00' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_carousels" ADD COLUMN "mock_test_id" text;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD COLUMN "preparation_class_id" text;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD COLUMN "test_booking_id" text;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD COLUMN "mock_test_id" text;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD COLUMN "preparation_class_id" text;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD COLUMN "test_booking_id" text;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD COLUMN "mock_test_id" text;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD COLUMN "preparation_class_id" text;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD COLUMN "test_booking_id" text;--> statement-breakpoint
ALTER TABLE "course_carousel_items" ADD CONSTRAINT "course_carousel_items_carousel_id_course_carousels_id_fk" FOREIGN KEY ("carousel_id") REFERENCES "public"."course_carousels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_faq_items" ADD CONSTRAINT "course_faq_items_faq_id_course_faqs_id_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."course_faqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_mock_test_id_course_mock_tests_id_fk" FOREIGN KEY ("mock_test_id") REFERENCES "public"."course_mock_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_preparation_class_id_course_preparation_classes_id_fk" FOREIGN KEY ("preparation_class_id") REFERENCES "public"."course_preparation_classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_test_booking_id_course_test_bookings_id_fk" FOREIGN KEY ("test_booking_id") REFERENCES "public"."course_test_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_mock_test_id_course_mock_tests_id_fk" FOREIGN KEY ("mock_test_id") REFERENCES "public"."course_mock_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_preparation_class_id_course_preparation_classes_id_fk" FOREIGN KEY ("preparation_class_id") REFERENCES "public"."course_preparation_classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_test_booking_id_course_test_bookings_id_fk" FOREIGN KEY ("test_booking_id") REFERENCES "public"."course_test_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_mock_test_id_course_mock_tests_id_fk" FOREIGN KEY ("mock_test_id") REFERENCES "public"."course_mock_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_preparation_class_id_course_preparation_classes_id_fk" FOREIGN KEY ("preparation_class_id") REFERENCES "public"."course_preparation_classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_test_booking_id_course_test_bookings_id_fk" FOREIGN KEY ("test_booking_id") REFERENCES "public"."course_test_bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_carousels" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "course_carousels" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "course_carousels" DROP COLUMN "order";--> statement-breakpoint
ALTER TABLE "course_carousels" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "course_carousels" DROP COLUMN "items";--> statement-breakpoint
ALTER TABLE "course_faqs" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "course_faqs" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "course_faqs" DROP COLUMN "order";--> statement-breakpoint
ALTER TABLE "course_faqs" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "course_faqs" DROP COLUMN "items";--> statement-breakpoint
ALTER TABLE "course_pricings" DROP COLUMN "features";--> statement-breakpoint
ALTER TABLE "course_pricings" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "course_pricings" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "course_pricings" DROP COLUMN "type";