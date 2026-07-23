import { Injectable } from '@nestjs/common'
import type { ClassesResponse } from '@classops/contracts'
import { InMemoryClassesRepository, type ClassesRepository } from './classes.repository'

@Injectable()
export class ClassesService {
  private readonly repository: ClassesRepository = new InMemoryClassesRepository()

  async list(studioId: string): Promise<ClassesResponse> {
    return { studioId, items: await this.repository.listByStudio(studioId) }
  }
}
