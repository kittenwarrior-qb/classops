import { BadRequestException, Controller, Get, Headers } from "@nestjs/common";
import type { StudentsResponse } from "@classops/contracts";
import { StudentsService } from "./students.service";

@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  list(
    @Headers("x-studio-id") studioId: string | undefined,
  ): Promise<StudentsResponse> {
    if (!studioId || !isUuid(studioId))
      throw new BadRequestException("x-studio-id must be a valid studio id");
    return this.studentsService.list(studioId);
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
