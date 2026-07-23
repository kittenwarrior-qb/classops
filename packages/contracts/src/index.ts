export type HealthResponse = {
  status: 'ok'
  service: 'classops-api'
  version: string
}

export type StudioRole = 'owner' | 'teacher'

export type StudioContext = {
  studioId: string
  userId: string
  role: StudioRole
}
