export type HealthResponse = {
  status: "ok";
  service: "classops-api";
  version: string;
};

export type StudioRole = "owner" | "teacher";

export type StudioContext = {
  studioId: string;
  userId: string;
  role: StudioRole;
};

export type ClassSummary = {
  id: string;
  name: string;
  branch: string;
  schedule: string;
  studentCount: number;
  studentIds: string[];
};

export type ClassesResponse = {
  studioId: string;
  items: ClassSummary[];
};

export type AttendanceResponse = {
  studioId: string;
  classId: string;
  date: string;
  absentStudentIds: string[];
};

export type StudentSummary = {
  id: string;
  name: string;
};

export type StudentsResponse = {
  studioId: string;
  items: StudentSummary[];
};
