CREATE TYPE "public"."reservation_type" AS ENUM('preparation_class', 'test_booking', 'mock_test');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TABLE "course_carousels" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"type" "reservation_type" DEFAULT 'preparation_class' NOT NULL,
	"items" jsonb,
	"author_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_faqs" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"type" "reservation_type" DEFAULT 'preparation_class' NOT NULL,
	"items" jsonb,
	"author_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_mock_tests" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"content" text DEFAULT 'HELLO WORLD!' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"author_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_preparation_classes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"content" text DEFAULT 'HELLO WORLD!' NOT NULL,
	"is_active" boolean DEFAULT false,
	"course_id" text NOT NULL,
	"author_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_pricings" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"features" text[] NOT NULL,
	"price" numeric(10, 2) DEFAULT '100.00' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"type" "reservation_type" DEFAULT 'preparation_class' NOT NULL,
	"author_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_test_bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"content" text DEFAULT 'HELLO WORLD!' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"author_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" text PRIMARY KEY NOT NULL,
	"cv" jsonb,
	"dob" date,
	"passport" jsonb,
	"citizenship" jsonb,
	"phone_number" text,
	"permanent_address" jsonb,
	"temporary_address" jsonb,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"payment_method" text NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"image_url" text NOT NULL,
	"status" "transaction_status" DEFAULT 'paid' NOT NULL,
	"user_id" text NOT NULL,
	"reservation_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "content" SET DEFAULT 'HELLO WORLD!';--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT 'processing';--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "is_published" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "author_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "valid_till" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "reservations" ADD COLUMN "type" "reservation_type" DEFAULT 'preparation_class' NOT NULL;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_carousels" ADD CONSTRAINT "course_carousels_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_faqs" ADD CONSTRAINT "course_faqs_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_mock_tests" ADD CONSTRAINT "course_mock_tests_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_mock_tests" ADD CONSTRAINT "course_mock_tests_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_preparation_classes" ADD CONSTRAINT "course_preparation_classes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_preparation_classes" ADD CONSTRAINT "course_preparation_classes_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_pricings" ADD CONSTRAINT "course_pricings_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_test_bookings" ADD CONSTRAINT "course_test_bookings_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_test_bookings" ADD CONSTRAINT "course_test_bookings_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_reservation_id_reservations_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "reservations" DROP COLUMN "name";