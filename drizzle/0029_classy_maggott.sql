ALTER TABLE "reservations" ADD COLUMN "time" text NOT NULL DEFAULT '09:00-10:00';
ALTER TABLE "reservations" ADD COLUMN "seats" integer NOT NULL DEFAULT 10;