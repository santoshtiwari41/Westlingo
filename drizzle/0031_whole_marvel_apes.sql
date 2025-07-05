ALTER TABLE "reservations" ADD COLUMN "slot_id" text;--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_slot_id_reservation_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."reservation_slots"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservations" DROP COLUMN "time";--> statement-breakpoint
ALTER TABLE "reservations" DROP COLUMN "seats";