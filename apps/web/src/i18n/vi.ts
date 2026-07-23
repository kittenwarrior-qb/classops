export const vi = {
  app: {
    name: "ClassOps",
    title: "ClassOps — vận hành lớp học",
    subtitle: "Việc của lớp, gọn trong một chỗ.",
    description: "Công cụ vận hành cho lớp học nhỏ.",
    demoLabel: "dữ liệu ảo",
  },
  nav: {
    overview: "Tổng quan",
    classes: "Lớp học",
    attendance: "Điểm danh",
    renewals: "Gia hạn",
    settings: "Cài đặt",
  },
  common: {
    back: "Quay lại",
    cancel: "Bỏ qua",
    save: "Lưu",
    done: "Xong rồi",
    search: "Tìm học viên",
    share: "Chia sẻ tin nhắn",
    copied: "Đã chép tin nhắn",
    export: "Xuất dữ liệu",
    refresh: "Làm mới",
    studentNoun: "học viên",
    absent: "vắng",
    present: "có mặt",
    all: "Tất cả",
    syncFailed: "Chưa gửi được, đang thử lại",
  },
  dashboard: {
    greeting: "Hôm nay lớp nào học?",
    description: "Chọn một việc để bắt đầu.",
    classesToday: "Lớp hôm nay",
    expiringSoon: "Sắp hết hạn",
    absentToday: "Đã ghi nhận vắng",
    noClasses: "Chưa có lớp hôm nay",
    noExpiring: "Chưa có ai sắp hết hạn",
    quickStart: "Bắt đầu nhanh",
  },
  classes: {
    heading: "Lớp học",
    description: "Các lớp đang hoạt động của studio.",
    schedule: "{schedule}",
    count: "{count} {noun}",
    open: "Mở lớp",
    teacher: "Thầy {name}",
    branch: "{name}",
  },
  attendance: {
    heading: "Ai nghỉ hôm nay?",
    hint: "Cả lớp đang có mặt. Chạm vào {noun} nghỉ.",
    chooseClass: "Chọn lớp để điểm danh",
    save: "Lưu điểm danh",
    saved: "Xong · {present} {noun} có mặt",
    empty: "Chưa có ai vắng.",
    messageHeading: "Tin nhắn cho lớp",
    messageAbsent: "Vắng: {names}.",
    messageEmpty: "Hôm nay chưa có ai vắng.",
    history: "Lần gần đây",
    absentStatus: "vắng hôm nay",
    expiryStatus: "hết hạn {date}",
    moreStudents: "còn {count} {noun} nữa",
  },
  renewals: {
    heading: "Theo dõi gia hạn",
    description: "Những học viên sắp hết hạn hoặc đã hết hạn.",
    warning: "Còn {days} ngày",
    expired: "Đã hết hạn",
    renewed: "Đã gia hạn",
    record: "Ghi nhận gia hạn",
    createMessage: "Soạn tin nhắn",
    empty: "Chưa có ai cần gọi lại.",
  },
  settings: {
    heading: "Cài đặt studio",
    description: "Giá trị dùng chung cho cách gọi và tin nhắn.",
    studentNoun: "Cách gọi học viên",
    studentNounValue: "học viên",
    studentNounBaby: "bé",
    studentNounMartial: "võ sinh",
    data: "Dữ liệu",
    dataDescription: "Dữ liệu hiện tại chỉ là dữ liệu ảo trong trình duyệt.",
    exportCsv: "Xuất CSV",
    reset: "Đặt lại dữ liệu ảo",
  },
} as const;

type Leaves<T> = T extends string
  ? ""
  : {
      [K in keyof T]: `${K & string}${Leaves<T[K]> extends "" ? "" : `.${Leaves<T[K]>}`}`;
    }[keyof T];

export type MessageKey = Leaves<typeof vi>;

export function t(
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const value = key.split(".").reduce<unknown>((object, part) => {
    if (!object || typeof object !== "object") return undefined;
    return (object as Record<string, unknown>)[part];
  }, vi);
  if (typeof value !== "string") return key;
  return value.replace(/\{(\w+)\}/g, (_, name: string) =>
    String(vars?.[name] ?? `{${name}}`),
  );
}
