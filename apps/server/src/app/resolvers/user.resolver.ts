import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { User } from "@nx-boilerplate/models";
import { RepoService } from "../repo/repo.service";
import { PubSub } from "graphql-subscriptions";

export const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getUser(@Args("id") id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createOrLoginUser(@Args("email") email: string): Promise<User> {
    let user = await this.repoService.userRepo.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      user = this.repoService.userRepo.create({
        email: email.toLowerCase().trim(),
      });

      await this.repoService.userRepo.save(user);
    }
    pubSub.publish("getAddedUser", { getAddedUser: user });
    return user;
  }

  @Subscription(() => User)
  public getAddedUser() {
    return pubSub.asyncIterator("getAddedUser");
  }
}
