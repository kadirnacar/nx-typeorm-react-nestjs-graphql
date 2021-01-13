import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getMetadataArgsStorage } from "typeorm";
import { environment } from "../environments/environment";
import { GraphQLModule } from "@nestjs/graphql";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RepoModule } from "./repo/repo.module";
import { UserResolver } from "./resolvers/user.resolver";


const gqlImports = [UserResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: environment.db.database,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: true,
    }),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      playground: true,
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
