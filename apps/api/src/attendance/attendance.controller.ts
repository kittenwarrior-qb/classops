import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from "@nestjs/common";
import type { AttendanceResponse } from "@classops/contracts";
import { SaveAttendanceDto } from "./attendance.dto";
import { AttendanceService } from "./attendance.service";

@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  save(
    @Headers("x-studio-id") studioId: string | undefined,
    @Body() body: SaveAttendanceDto,
  ): Promise<AttendanceResponse> {
    if (!studioId || !isUuid(studioId))
      throw new BadRequestException("x-studio-id must be a valid studio id");
    return this.attendanceService.save(studioId, body);
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
