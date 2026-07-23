import { ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { ATTENDANCE_REPOSITORY } from "../src/attendance";
import { AppModule } from "../src/app.module";

describe("Attendance scope", () => {
  it("requires a studio id before accepting attendance", async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ATTENDANCE_REPOSITORY)
      .useValue({ save: async () => ({}) })
      .compile();
    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    await request(app.getHttpServer()).post("/attendance").send({}).expect(400);
    await app.close();
  });

  it("accepts a validated absence list for a studio", async () => {
    const response = {
      studioId: "11111111-1111-4111-8111-111111111111",
      classId: "22222222-2222-4222-8222-222222222222",
      date: "2026-07-23",
      absentStudentIds: ["33333333-3333-4333-8333-333333333333"],
    };
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ATTENDANCE_REPOSITORY)
      .useValue({ save: async () => response })
      .compile();
    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    await request(app.getHttpServer())
      .post("/attendance")
      .set("x-studio-id", response.studioId)
      .send({
        classId: response.classId,
        date: response.date,
        absentStudentIds: response.absentStudentIds,
      })
      .expect(201)
      .expect(response);
    await app.close();
  });
});
