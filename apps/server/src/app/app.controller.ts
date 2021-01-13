import { Controller, Get, Param } from "@nestjs/common";

import { AppService } from "./app.service";
import { RepoService } from "./repo/repo.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly repoService: RepoService
  ) {}

  @Get()
  async getData() {
    return this.repoService.userRepo.find();
  }

  @Get("/insert/:email")
  async insert(@Param() params) {
    const user = await this.repoService.userRepo.save({ email: params.email });
    return user;
  }
}
