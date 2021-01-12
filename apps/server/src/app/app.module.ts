import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getMetadataArgsStorage } from "typeorm";
import { environment } from "../environments/environment";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RepoModule } from './repo/repo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: environment.db.database,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true
    }),
    RepoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
