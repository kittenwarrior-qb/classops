import type {
  AttendanceResponse,
  ClassesResponse,
  StudentsResponse,
} from "@classops/contracts";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";
export const configuredStudioId = import.meta.env.VITE_STUDIO_ID ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!configuredStudioId) throw new Error("VITE_STUDIO_ID is not configured");
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-studio-id": configuredStudioId,
      ...init?.headers,
    },
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return (await response.json()) as T;
}

export const classOpsApi = {
  listClasses: () => request<ClassesResponse>("/classes"),
  listStudents: () => request<StudentsResponse>("/students"),
  saveAttendance: (input: {
    classId: string;
    date: string;
    absentStudentIds: string[];
  }) =>
    request<AttendanceResponse>("/attendance", {
      method: "POST",
      body: JSON.stringify(input),
    }),
};
