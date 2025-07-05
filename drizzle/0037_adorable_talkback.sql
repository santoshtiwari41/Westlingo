CREATE TABLE "transaction_writing" (
	"id" serial PRIMARY KEY NOT NULL,
	"writing_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"image_url" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction_writing" ADD CONSTRAINT "transaction_writing_writing_id_writing_id_fk" FOREIGN KEY ("writing_id") REFERENCES "public"."writing"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_writing" ADD CONSTRAINT "transaction_writing_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;