export type DemoStudent = { id: string; name: string; expiresOn: string };
export type DemoClass = {
  id: string;
  name: string;
  schedule: string;
  branch: string;
  teacher: string;
  studentIds: string[];
};
export type DemoAttendance = {
  classId: string;
  date: string;
  absentIds: string[];
};

export const demoStudents: DemoStudent[] = [
  { id: "hv-001", name: "Nguyễn Ý An", expiresOn: "2026-08-01" },
  { id: "hv-002", name: "Trần Minh Châu", expiresOn: "2026-08-01" },
  { id: "hv-003", name: "Lê Gia Hân", expiresOn: "2026-07-25" },
  { id: "hv-004", name: "Phạm Khánh Linh", expiresOn: "2026-08-05" },
  { id: "hv-005", name: "Đỗ Hoàng Nam", expiresOn: "2026-07-20" },
  { id: "hv-006", name: "Nguyễn Hoàng Bảo Trân Anh", expiresOn: "2026-08-20" },
  { id: "hv-007", name: "Vũ Minh Anh", expiresOn: "2026-08-12" },
  { id: "hv-008", name: "Phan Nhật Minh", expiresOn: "2026-09-01" },
  { id: "hv-009", name: "Trần Ngọc Mai", expiresOn: "2026-07-29" },
  { id: "hv-010", name: "Đặng Quốc Bảo", expiresOn: "2026-07-18" },
];

export const demoClasses: DemoClass[] = [
  {
    id: "lh-01",
    name: "Lớp nhảy cơ bản",
    schedule: "thứ 2 & 4 · 18h30",
    branch: "Chi nhánh 1",
    teacher: "Thầy giáo 1",
    studentIds: ["hv-001", "hv-002", "hv-003", "hv-004", "hv-005", "hv-006"],
  },
  {
    id: "lh-02",
    name: "Lớp nhảy nâng cao",
    schedule: "thứ 2 & 4 · 19h45",
    branch: "Chi nhánh 1",
    teacher: "Thầy giáo 1",
    studentIds: ["hv-007", "hv-008", "hv-009", "hv-010"],
  },
];

export const demoAttendance: DemoAttendance[] = [
  { classId: "lh-01", date: "2026-07-20", absentIds: ["hv-003"] },
  { classId: "lh-02", date: "2026-07-20", absentIds: [] },
];
