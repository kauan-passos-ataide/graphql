-- CreateEnum
CREATE TYPE "public"."ROLE" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "role" "public"."ROLE" NOT NULL DEFAULT 'user'
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "public"."user"("id");
