import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { AttendanceResponse } from "@classops/contracts";
import { SaveAttendanceDto } from "./attendance.dto";
import {
  ATTENDANCE_REPOSITORY,
  type AttendanceRepository,
} from "./attendance.repository";

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly repository: AttendanceRepository,
  ) {}

  async save(
    studioId: string,
    input: SaveAttendanceDto,
  ): Promise<AttendanceResponse> {
    try {
      return await this.repository.save(
        studioId,
        input.classId,
        input.date,
        input.absentStudentIds,
      );
    } catch (error) {
      if (error instanceof Error && error.message === "CLASS_NOT_FOUND")
        throw new BadRequestException("class is not in this studio");
      if (error instanceof Error && error.message === "STUDENT_NOT_ENROLLED")
        throw new BadRequestException("student is not enrolled in this class");
      throw error;
    }
  }
}
