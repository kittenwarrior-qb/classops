CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "UserRole" AS ENUM ('owner', 'teacher');

CREATE TABLE "studios" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "studios_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "classes" (
    "id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "teacher_id" UUID,
    "archived_at" TIMESTAMP(3),
    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "students" (
    "id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "archived_at" TIMESTAMP(3),
    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "enrollments" (
    "id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "joined_at" DATE NOT NULL,
    "left_at" DATE,
    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "attendance" (
    "id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "archived_at" TIMESTAMP(3),
    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "audit_log" (
    "id" UUID NOT NULL,
    "studio_id" UUID NOT NULL,
    "actor_id" UUID,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" UUID NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_studio_id_idx" ON "users"("studio_id");
CREATE INDEX "classes_studio_id_archived_at_idx" ON "classes"("studio_id", "archived_at");
CREATE INDEX "students_studio_id_archived_at_idx" ON "students"("studio_id", "archived_at");
CREATE INDEX "enrollments_studio_id_class_id_idx" ON "enrollments"("studio_id", "class_id");
CREATE INDEX "enrollments_studio_id_student_id_idx" ON "enrollments"("studio_id", "student_id");
CREATE INDEX "attendance_studio_id_class_id_date_archived_at_idx" ON "attendance"("studio_id", "class_id", "date", "archived_at");
CREATE UNIQUE INDEX "attendance_studio_id_class_id_student_id_date_key" ON "attendance"("studio_id", "class_id", "student_id", "date");
CREATE INDEX "audit_log_studio_id_created_at_idx" ON "audit_log"("studio_id", "created_at");

ALTER TABLE "users" ADD CONSTRAINT "users_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "classes" ADD CONSTRAINT "classes_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "students" ADD CONSTRAINT "students_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
