import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepoService } from "./repo.service";
import { Message, User } from "@nx-boilerplate/models";

@Global()
@Module({
  providers: [RepoService],
  imports: [TypeOrmModule.forFeature([User, Message])],
  exports: [RepoService],
})
export class RepoModule {}
