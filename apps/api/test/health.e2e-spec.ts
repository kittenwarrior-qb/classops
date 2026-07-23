import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Health", () => {
  it("returns an operational response", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .get("/health")
      .expect(200)
      .expect({ status: "ok", service: "classops-api", version: "0.1.0" });
    await app.close();
  });
});
