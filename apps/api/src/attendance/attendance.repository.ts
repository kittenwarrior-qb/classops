import type { AttendanceResponse } from "@classops/contracts";
import { PrismaService } from "../prisma/prisma.service";

export const ATTENDANCE_REPOSITORY = Symbol("ATTENDANCE_REPOSITORY");

export interface AttendanceRepository {
  save(
    studioId: string,
    classId: string,
    date: string,
    absentStudentIds: string[],
  ): Promise<AttendanceResponse>;
}

export class PrismaAttendanceRepository implements AttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(
    studioId: string,
    classId: string,
    date: string,
    absentStudentIds: string[],
  ): Promise<AttendanceResponse> {
    const attendanceDate = new Date(`${date}T00:00:00.000Z`);
    return this.prisma.$transaction(async (transaction) => {
      const classRecord = await transaction.class.findFirst({
        where: { id: classId, studioId, archivedAt: null },
      });
      if (!classRecord) throw new Error("CLASS_NOT_FOUND");

      const enrolled = await transaction.enrollment.findMany({
        where: {
          studioId,
          classId,
          studentId: { in: absentStudentIds },
          leftAt: null,
        },
        select: { studentId: true },
      });
      if (enrolled.length !== absentStudentIds.length)
        throw new Error("STUDENT_NOT_ENROLLED");

      const existing = await transaction.attendance.findMany({
        where: { studioId, classId, date: attendanceDate, archivedAt: null },
      });
      const absentSet = new Set(absentStudentIds);
      await Promise.all(
        existing
          .filter((item) => !absentSet.has(item.studentId))
          .map((item) =>
            transaction.attendance.update({
              where: { id: item.id },
              data: { archivedAt: new Date() },
            }),
          ),
      );
      await Promise.all(
        absentStudentIds.map((studentId) =>
          transaction.attendance.upsert({
            where: {
              studioId_classId_studentId_date: {
                studioId,
                classId,
                studentId,
                date: attendanceDate,
              },
            },
            create: { studioId, classId, studentId, date: attendanceDate },
            update: { archivedAt: null },
          }),
        ),
      );

      return { studioId, classId, date, absentStudentIds };
    });
  }
}
