import { Inject, Injectable } from "@nestjs/common";
import type { ClassesResponse } from "@classops/contracts";
import {
  CLASSES_REPOSITORY,
  type ClassesRepository,
} from "./classes.repository";

@Injectable()
export class ClassesService {
  constructor(
    @Inject(CLASSES_REPOSITORY) private readonly repository: ClassesRepository,
  ) {}

  async list(studioId: string): Promise<ClassesResponse> {
    return { studioId, items: await this.repository.listByStudio(studioId) };
  }
}
