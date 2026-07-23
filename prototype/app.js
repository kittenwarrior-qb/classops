import { t } from './i18n/vi.js'

const classes = [
  { id: 'lh-01', name: 'Lớp nhảy cơ bản', schedule: 'thứ 2 & 4 · 18h30', students: ['Nguyễn Ý An', 'Trần Minh Châu', 'Lê Gia Hân', 'Phạm Khánh Linh', 'Đỗ Hoàng Nam', 'Nguyễn Hoàng Bảo Trân Anh'] },
  { id: 'lh-02', name: 'Lớp nhảy nâng cao', schedule: 'thứ 2 & 4 · 19h45', students: ['Vũ Minh Anh', 'Phan Nhật Minh', 'Trần Ngọc Mai', 'Đặng Quốc Bảo'] },
  { id: 'lh-03', name: 'Lớp thiếu nhi', schedule: 'thứ 3 & 5 · 18h00', students: ['Nguyễn Đức Anh', 'Lê Minh Khang', 'Phạm Hà My', 'Đỗ Nhật Nam'] },
]

const state = { selectedClass: null, absent: new Set(), message: '' }
const app = document.querySelector('#app')

const today = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())

function renderClassList() {
  app.innerHTML = `
    <span class="eyebrow">${t('app.eyebrow')}</span>
    <h1>${t('app.heading')}</h1>
    <p class="lead">${t('app.description')}</p>
    <section class="class-list" aria-label="${t('common.classListLabel')}">
      ${classes.map((item) => `
        <button class="class-card" data-class-id="${item.id}">
          <span><span class="class-name">${item.name}</span><span class="class-meta">${t('classes.today', { schedule: item.schedule })}</span></span>
          <span class="class-count">${t('classes.count', { count: item.students.length, noun: t('common.studentNoun') })}</span>
        </button>`).join('')}
    </section>`
  app.querySelectorAll('[data-class-id]').forEach((button) => button.addEventListener('click', () => openClass(button.dataset.classId)))
}

function openClass(id) {
  state.selectedClass = classes.find((item) => item.id === id)
  state.absent = new Set()
  state.message = ''
  renderAttendance()
}

function renderAttendance() {
  const current = state.selectedClass
  const present = current.students.length - state.absent.size
  app.innerHTML = `
    <div class="topbar"><button class="back" id="back">← ${t('common.back')}</button></div>
    <span class="eyebrow">${current.schedule}</span>
    <h1>${current.name}</h1>
    <section class="attendance-panel">
      <div class="panel-head"><h2>${t('attendance.heading')}</h2><p class="hint">${t('attendance.hint')}</p></div>
      <div class="student-list" role="group" aria-label="${t('common.studentListLabel')}">
        ${current.students.map((name, index) => {
          const absent = state.absent.has(index)
          return `<button class="student-row ${absent ? 'is-absent' : ''}" data-student-index="${index}" aria-pressed="${absent}"><span class="dot" aria-hidden="true"></span><span class="student-name">${name}</span><span class="student-state">${t('common.absent')}</span></button>`
        }).join('')}
      </div>
      <div class="panel-actions"><button class="primary" id="make-message">${t('attendance.save')}</button></div>
    </section>
    ${state.message ? `<section class="message-panel"><h2>${t('attendance.messageHeading')}</h2><div class="message">${state.message}</div><button class="secondary" id="share">${t('common.share')}</button></section>` : ''}`

  document.querySelector('#back').addEventListener('click', renderClassList)
  document.querySelectorAll('[data-student-index]').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.studentIndex)
    state.absent.has(index) ? state.absent.delete(index) : state.absent.add(index)
    renderAttendance()
  }))
  document.querySelector('#make-message').addEventListener('click', () => {
    state.message = buildMessage()
    renderAttendance()
    document.querySelector('.message-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
  document.querySelector('#share')?.addEventListener('click', shareMessage)
}

function buildMessage() {
  const absentNames = [...state.absent].sort((a, b) => a - b).map((index) => state.selectedClass.students[index])
  const present = state.selectedClass.students.length - absentNames.length
  const absentText = absentNames.length ? t('attendance.absentLine', { names: absentNames.join(', ') }) : t('attendance.emptyAbsences')
  return `${state.selectedClass.name} · ${today}\n${t('attendance.presentLine', { present, total: state.selectedClass.students.length, noun: t('common.studentNoun') })}\n${absentText}`
}

async function shareMessage() {
  if (navigator.share) {
    await navigator.share({ title: state.selectedClass.name, text: state.message })
    return
  }
  await navigator.clipboard.writeText(state.message)
  const button = document.querySelector('#share')
  button.textContent = t('common.copied')
}

renderClassList()
