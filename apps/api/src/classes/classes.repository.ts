import type { ClassSummary } from "@classops/contracts";
import { PrismaService } from "../prisma/prisma.service";

export const CLASSES_REPOSITORY = Symbol("CLASSES_REPOSITORY");

export interface ClassesRepository {
  listByStudio(studioId: string): Promise<ClassSummary[]>;
}

export class PrismaClassesRepository implements ClassesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByStudio(studioId: string): Promise<ClassSummary[]> {
    const classes = await this.prisma.class.findMany({
      where: { studioId, archivedAt: null },
      orderBy: { name: "asc" },
      include: {
        _count: { select: { enrollments: { where: { leftAt: null } } } },
      },
    });

    return classes.map((item) => ({
      id: item.id,
      name: item.name,
      branch: item.branch,
      schedule: item.schedule,
      studentCount: item._count.enrollments,
    }));
  }
}

export class InMemoryClassesRepository implements ClassesRepository {
  async listByStudio(_studioId: string): Promise<ClassSummary[]> {
    void _studioId;
    return [];
  }
}
