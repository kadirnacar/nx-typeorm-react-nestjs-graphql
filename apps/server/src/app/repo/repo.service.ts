import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, Message } from "@nx-boilerplate/models";
import { Repository } from "typeorm";

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>
  ) {}
}
