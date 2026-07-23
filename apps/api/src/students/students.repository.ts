import type { StudentSummary } from "@classops/contracts";
import { PrismaService } from "../prisma/prisma.service";

export const STUDENTS_REPOSITORY = Symbol("STUDENTS_REPOSITORY");

export interface StudentsRepository {
  listByStudio(studioId: string): Promise<StudentSummary[]>;
}

export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByStudio(studioId: string): Promise<StudentSummary[]> {
    return this.prisma.student.findMany({
      where: { studioId, archivedAt: null },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
  }
}
