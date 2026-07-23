import type { ClassSummary } from '@classops/contracts'

export interface ClassesRepository {
  listByStudio(studioId: string): Promise<ClassSummary[]>
}

export class InMemoryClassesRepository implements ClassesRepository {
  async listByStudio(_studioId: string): Promise<ClassSummary[]> {
    void _studioId
    return []
  }
}
