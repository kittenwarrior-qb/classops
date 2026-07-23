import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClassesController, ClassesService } from './classes'
import { HealthController } from './health/health.controller'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HealthController, ClassesController],
  providers: [ClassesService],
})
export class AppModule {}
