import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module'

describe('Classes scope', () => {
  it('requires an explicit studio id', async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    const app = moduleRef.createNestApplication()
    await app.init()

    await request(app.getHttpServer()).get('/classes').expect(400)
    await app.close()
  })

  it('returns data scoped to the requested studio', async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile()
    const app = moduleRef.createNestApplication()
    await app.init()

    const studioId = '11111111-1111-4111-8111-111111111111'
    await request(app.getHttpServer())
      .get('/classes')
      .set('x-studio-id', studioId)
      .expect(200)
      .expect({ studioId, items: [] })
    await app.close()
  })
})
