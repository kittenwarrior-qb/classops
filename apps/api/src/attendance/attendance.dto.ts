import { ArrayUnique, IsArray, IsUUID, Matches } from "class-validator";

export class SaveAttendanceDto {
  @IsUUID("4")
  classId!: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date!: string;

  @IsArray()
  @ArrayUnique()
  @IsUUID("4", { each: true })
  absentStudentIds!: string[];
}
