import { BadRequestException, Controller, Get, Headers } from "@nestjs/common";
import type { ClassesResponse } from "@classops/contracts";
import { ClassesService } from "./classes.service";

@Controller("classes")
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  list(@Headers("x-studio-id") studioId?: string): Promise<ClassesResponse> {
    if (!studioId || !isUuid(studioId)) {
      throw new BadRequestException("x-studio-id must be a valid studio id");
    }
    return this.classesService.list(studioId);
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
