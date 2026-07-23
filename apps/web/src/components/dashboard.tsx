'use client'

import { useEffect, useState } from 'react'
import { CalendarCheck, ChevronRight, Clipboard, Download, LayoutDashboard, RotateCcw, Search, Settings, Share2, Users, WalletCards, X } from 'lucide-react'
import { t } from '../i18n/vi'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { daysUntil, formatDate, formatDateInput } from '../lib/format'
import { demoAttendance, demoClasses, demoStudents, type DemoAttendance, type DemoClass, type DemoStudent } from '../lib/demo-data'
import { matchesSearch, sortByVietnameseName } from '../lib/vietnamese'

type View = 'overview' | 'classes' | 'attendance' | 'renewals' | 'settings'
type AttendanceState = Record<string, DemoAttendance[]>

const today = formatDateInput(new Date())

export function Dashboard() {
  const [view, setView] = useState<View>('overview')
  const [selectedClassId, setSelectedClassId] = useState(demoClasses[0].id)
  const [search, setSearch] = useState('')
  const [absentIds, setAbsentIds] = useState<string[]>([])
  const [attendance, setAttendance] = useState<AttendanceState>({ [demoClasses[0].id]: demoAttendance.filter((item) => item.classId === demoClasses[0].id) })
  const [renewedIds, setRenewedIds] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const storedAttendance = window.localStorage.getItem('classops.attendance')
    const storedRenewals = window.localStorage.getItem('classops.renewed')
    if (storedAttendance) setAttendance(JSON.parse(storedAttendance) as AttendanceState)
    if (storedRenewals) setRenewedIds(JSON.parse(storedRenewals) as string[])
  }, [])

  useEffect(() => {
    window.localStorage.setItem('classops.attendance', JSON.stringify(attendance))
  }, [attendance])

  useEffect(() => {
    window.localStorage.setItem('classops.renewed', JSON.stringify(renewedIds))
  }, [renewedIds])

  const selectedClass = demoClasses.find((item) => item.id === selectedClassId) ?? demoClasses[0]
  const selectedStudents = selectedClass.studentIds.map((id) => demoStudents.find((student) => student.id === id)).filter((student): student is DemoStudent => Boolean(student))
  const expiringStudents = demoStudents.filter((student) => daysUntil(student.expiresOn) <= 14 && !renewedIds.includes(student.id))
  const filteredStudents = sortByVietnameseName(selectedStudents.filter((student) => matchesSearch(student.name, search)), (student) => student.name)

  function selectView(nextView: View) {
    setNotice('')
    setMessage('')
    setView(nextView)
  }

  function selectClass(id: string) {
    setSelectedClassId(id)
    setAbsentIds([])
    setMessage('')
    setView('attendance')
  }

  function toggleAbsent(id: string) {
    setAbsentIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function saveAttendance() {
    setAttendance((current) => ({ ...current, [selectedClass.id]: [...(current[selectedClass.id] ?? []), { classId: selectedClass.id, date: today, absentIds }] }))
    setMessage(buildAttendanceMessage(selectedClass, selectedStudents, absentIds))
    setNotice(t('attendance.saved', { present: selectedStudents.length - absentIds.length, noun: t('settings.studentNounValue') }))
  }

  function buildAttendanceMessage(classInfo: DemoClass, students: DemoStudent[], absent: string[]) {
    const names = students.filter((student) => absent.includes(student.id)).map((student) => student.name)
    const absentText = names.length ? t('attendance.messageAbsent', { names: names.join(', ') }) : t('attendance.messageEmpty')
    return `${classInfo.name} · ${formatDate(today)}\n${t('attendance.saved', { present: students.length - absent.length, noun: t('settings.studentNounValue') })}\n${absentText}`
  }

  async function share(text: string) {
    if (navigator.share) {
      await navigator.share({ title: t('app.name'), text })
      return
    }
    await navigator.clipboard.writeText(text)
    setNotice(t('common.copied'))
  }

  function recordRenewal(id: string) {
    setRenewedIds((current) => [...current, id])
    setNotice(t('renewals.renewed'))
  }

  function exportCsv() {
    const rows = ['id,name,expiresOn', ...demoStudents.map((student) => `${student.id},"${student.name}",${student.expiresOn}`)]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'classops-du-lieu-ao.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  function resetDemo() {
    setRenewedIds([])
    setAttendance({})
    setAbsentIds([])
    setMessage('')
    setNotice(t('common.done'))
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">C</span><span><strong>{t('app.name')}</strong><small>{t('app.subtitle')}</small></span></div>
      <nav aria-label={t('app.name')}>
        <NavButton active={view === 'overview'} icon={<LayoutDashboard size={18} />} label={t('nav.overview')} onClick={() => selectView('overview')} />
        <NavButton active={view === 'classes'} icon={<Users size={18} />} label={t('nav.classes')} onClick={() => selectView('classes')} />
        <NavButton active={view === 'attendance'} icon={<CalendarCheck size={18} />} label={t('nav.attendance')} onClick={() => selectView('attendance')} />
        <NavButton active={view === 'renewals'} icon={<WalletCards size={18} />} label={t('nav.renewals')} onClick={() => selectView('renewals')} />
        <NavButton active={view === 'settings'} icon={<Settings size={18} />} label={t('nav.settings')} onClick={() => selectView('settings')} />
      </nav>
      <div className="sidebar-foot">{t('app.name')} · {t('app.demoLabel')}</div>
    </aside>
    <main className="main-content">
      {notice && <div className="notice" role="status">{notice}</div>}
      {view === 'overview' && <Overview classes={demoClasses} expiringCount={expiringStudents.length} onView={selectView} />}
      {view === 'classes' && <Classes classes={demoClasses} students={demoStudents} onSelect={selectClass} />}
      {view === 'attendance' && <Attendance classes={demoClasses} selected={selectedClass} students={filteredStudents} search={search} setSearch={setSearch} absentIds={absentIds} toggleAbsent={toggleAbsent} save={saveAttendance} message={message} share={share} onSelect={selectClass} />}
      {view === 'renewals' && <Renewals students={expiringStudents} onRenew={recordRenewal} onMessage={(student) => share(t('renewals.createMessage') + `: ${student.name}`)} />}
      {view === 'settings' && <SettingsPanel onExport={exportCsv} onReset={resetDemo} />}
    </main>
  </div>
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <Button variant="ghost" className={`nav-button ${active ? 'active' : ''}`} aria-label={label} onClick={onClick}>{icon}<span>{label}</span></Button>
}

function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-header"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></header>
}

function Overview({ classes, expiringCount, onView }: { classes: DemoClass[]; expiringCount: number; onView: (view: View) => void }) {
  return <>
    <PageHeader eyebrow={t('app.name')} title={t('dashboard.greeting')} description={t('dashboard.description')} />
    <section className="stats-grid">
      <StatCard label={t('dashboard.classesToday')} value={String(classes.length)} icon={<CalendarCheck />} />
      <StatCard label={t('dashboard.expiringSoon')} value={String(expiringCount)} icon={<WalletCards />} />
      <StatCard label={t('dashboard.absentToday')} value="0" icon={<Users />} />
    </section>
    <section className="section-block"><div className="section-heading"><div><span className="eyebrow">{t('dashboard.quickStart')}</span><h2>{t('classes.heading')}</h2></div><button className="text-button" onClick={() => onView('classes')}>{t('classes.open')} <ChevronRight size={17} /></button></div><div className="class-grid">{classes.map((item) => <ClassCard key={item.id} item={item} onClick={() => onView('attendance')} />)}</div></section>
  </>
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="stat-card"><span className="stat-icon">{icon}</span><span className="stat-value">{value}</span><span className="stat-label">{label}</span></div>
}

function ClassCard({ item, onClick }: { item: DemoClass; onClick: () => void }) {
  return <Button variant="ghost" className="class-card" onClick={onClick}><span><strong>{item.name}</strong><small>{t('classes.schedule', { schedule: item.schedule })}</small><small>{t('classes.branch', { name: item.branch })}</small></span><ChevronRight size={19} /></Button>
}

function Classes({ classes, students, onSelect }: { classes: DemoClass[]; students: DemoStudent[]; onSelect: (id: string) => void }) {
  return <><PageHeader eyebrow={t('nav.classes')} title={t('classes.heading')} description={t('classes.description')} /><div className="class-grid wide">{classes.map((item) => <div className="class-card-wrap" key={item.id}><ClassCard item={item} onClick={() => onSelect(item.id)} /><div className="class-detail"><span>{t('classes.teacher', { name: item.teacher })}</span><span>{t('classes.count', { count: item.studentIds.filter((id) => students.some((student) => student.id === id)).length, noun: t('common.studentNoun') })}</span></div></div>)}</div></>
}

function Attendance({ classes, selected, students, search, setSearch, absentIds, toggleAbsent, save, message, share, onSelect }: { classes: DemoClass[]; selected: DemoClass; students: DemoStudent[]; search: string; setSearch: (value: string) => void; absentIds: string[]; toggleAbsent: (id: string) => void; save: () => void; message: string; share: (text: string) => Promise<void>; onSelect: (id: string) => void }) {
  return <div className="focus-page"><div className="focus-heading"><div className="focus-class-select"><span className="eyebrow">{t('nav.attendance')}</span><Select value={selected.id} onChange={(event) => onSelect(event.target.value)} aria-label={t('attendance.chooseClass')}>{classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select><p>{selected.schedule} · {selected.studentIds.length} {t('common.studentNoun')}</p></div><label className="search-box compact-search"><Search size={17} /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('common.search')} aria-label={t('common.search')} /></label></div><Card className="focus-card"><div className="focus-hint"><Users size={20} /><span>{t('attendance.hint', { noun: t('common.studentNoun') })}</span></div><div className="student-list">{students.map((student) => { const absent = absentIds.includes(student.id); const expiresSoon = daysUntil(student.expiresOn) <= 14; return <button key={student.id} className={`student-row ${absent ? 'is-absent' : ''}`} onClick={() => toggleAbsent(student.id)} aria-pressed={absent}><span className="student-avatar">{initials(student.name)}</span><span className="student-copy"><span className="student-name">{student.name}</span>{absent ? <span className="student-meta">{t('attendance.absentStatus')}</span> : expiresSoon ? <span className="student-meta expiry-meta">{t('attendance.expiryStatus', { date: formatDate(student.expiresOn) })}</span> : null}</span><span className="row-status" aria-hidden="true">{absent ? <X size={21} /> : null}</span></button> })}</div><div className="focus-footer"><span>{t('attendance.saved', { present: students.length - absentIds.length, noun: t('common.studentNoun') })}</span><Button className="primary-button" onClick={save}>{t('attendance.save')}</Button></div></Card>{message && <Card className="message-card"><div className="section-heading"><h2>{t('attendance.messageHeading')}</h2><Button variant="ghost" className="icon-button" onClick={() => share(message)} aria-label={t('common.share')}><Share2 size={18} /></Button></div><p>{message}</p><Button variant="outline" className="secondary-button" onClick={() => share(message)}><Clipboard size={17} />{t('common.share')}</Button></Card>}</div>
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : name.slice(0, 2)
}

function Renewals({ students, onRenew, onMessage }: { students: DemoStudent[]; onRenew: (id: string) => void; onMessage: (student: DemoStudent) => void }) {
  return <><PageHeader eyebrow={t('nav.renewals')} title={t('renewals.heading')} description={t('renewals.description')} /><section className="panel renewal-list">{students.length === 0 ? <div className="empty-state">{t('renewals.empty')}</div> : students.map((student) => { const days = daysUntil(student.expiresOn); return <article className="renewal-row" key={student.id}><div><strong>{student.name}</strong><small>{days < 0 ? t('renewals.expired') : t('renewals.warning', { days })} · {formatDate(student.expiresOn)}</small></div><div className="row-actions"><button className="secondary-button compact" onClick={() => onMessage(student)}><Share2 size={16} />{t('renewals.createMessage')}</button><button className="primary-button compact" onClick={() => onRenew(student.id)}>{t('renewals.record')}</button></div></article> })}</section></>
}

function SettingsPanel({ onExport, onReset }: { onExport: () => void; onReset: () => void }) {
  return <><PageHeader eyebrow={t('nav.settings')} title={t('settings.heading')} description={t('settings.description')} /><section className="settings-grid"><div className="setting-card"><label htmlFor="student-noun">{t('settings.studentNoun')}</label><Select id="student-noun" defaultValue={t('settings.studentNounValue')}><option>{t('settings.studentNounValue')}</option><option>{t('settings.studentNounBaby')}</option><option>{t('settings.studentNounMartial')}</option></Select></div><div className="setting-card"><div><strong>{t('settings.data')}</strong><p>{t('settings.dataDescription')}</p></div><div className="row-actions"><Button variant="outline" className="secondary-button" onClick={onExport}><Download size={17} />{t('settings.exportCsv')}</Button><Button variant="destructive" className="danger-button" onClick={onReset}><RotateCcw size={17} />{t('settings.reset')}</Button></div></div></section></>
}
