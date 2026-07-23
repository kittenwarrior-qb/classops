import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  CLASSES_REPOSITORY,
  ClassesController,
  ClassesService,
  PrismaClassesRepository,
} from "./classes";
import {
  ATTENDANCE_REPOSITORY,
  AttendanceController,
  AttendanceService,
  PrismaAttendanceRepository,
} from "./attendance";
import { HealthController } from "./health/health.controller";
import { PrismaService } from "./prisma";
import {
  PrismaStudentsRepository,
  STUDENTS_REPOSITORY,
  StudentsController,
  StudentsService,
} from "./students";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [
    HealthController,
    ClassesController,
    AttendanceController,
    StudentsController,
  ],
  providers: [
    PrismaService,
    ClassesService,
    AttendanceService,
    StudentsService,
    { provide: CLASSES_REPOSITORY, useClass: PrismaClassesRepository },
    { provide: ATTENDANCE_REPOSITORY, useClass: PrismaAttendanceRepository },
    { provide: STUDENTS_REPOSITORY, useClass: PrismaStudentsRepository },
  ],
})
export class AppModule {}
