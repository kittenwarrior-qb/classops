export const vi = {
  app: {
    title: 'ClassOps — Prototype',
    eyebrow: 'ClassOps · prototype',
    heading: 'Hôm nay lớp nào học?',
    description: 'Chọn một lớp để xem danh sách và ghi nhận người vắng.',
  },
  common: {
    back: 'Các lớp',
    share: 'Chia sẻ tin nhắn',
    copied: 'Đã chép tin nhắn',
    absent: 'vắng',
    studentNoun: 'học viên',
    classListLabel: 'Danh sách lớp',
    studentListLabel: 'Danh sách học viên',
  },
  attendance: {
    heading: 'Ai nghỉ hôm nay?',
    hint: 'Cả lớp đang có mặt. Chạm vào học viên nghỉ.',
    save: 'Tạo tin nhắn',
    saved: 'Xong rồi · {present} {noun} có mặt',
    messageHeading: 'Tin nhắn cho lớp',
    emptyAbsences: 'Hôm nay chưa có ai vắng.',
    presentLine: 'Xong · {present}/{total} {noun} có mặt',
    absentLine: 'Vắng: {names}.',
  },
  classes: {
    count: '{count} {noun}',
    today: 'Hôm nay · {schedule}',
  },
}

export function t(key, vars = {}) {
  const value = key.split('.').reduce((object, part) => object?.[part], vi)
  if (typeof value !== 'string') return key
  return value.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`))
}
