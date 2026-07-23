import { Controller, Get } from "@nestjs/common";
import type { HealthResponse } from "@classops/contracts";

@Controller("health")
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return { status: "ok", service: "classops-api", version: "0.1.0" };
  }
}
