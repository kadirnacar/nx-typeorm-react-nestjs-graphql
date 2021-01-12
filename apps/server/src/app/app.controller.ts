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
    console.log("deneme")
    return `There are ${await this.repoService.messageRepo.count()} existent messages`;
  }

  @Get("/insert/:email")
  async insert(@Param() params) {
    await this.repoService.userRepo.save({ email: params.email });
    return `There are ${await this.repoService.messageRepo.count()} existent messages`;
  }
}
