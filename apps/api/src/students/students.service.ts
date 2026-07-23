import { Inject, Injectable } from "@nestjs/common";
import type { StudentsResponse } from "@classops/contracts";
import {
  STUDENTS_REPOSITORY,
  type StudentsRepository,
} from "./students.repository";

@Injectable()
export class StudentsService {
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    private readonly repository: StudentsRepository,
  ) {}

  async list(studioId: string): Promise<StudentsResponse> {
    return { studioId, items: await this.repository.listByStudio(studioId) };
  }
}
