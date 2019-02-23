import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
  private users: User[] = [
    { username: 'admin', password: hashSync('password'), role: Roles.ADMIN },
    { username: 'fflieger', password: hashSync('1234'), role: Roles.USER },
  ];

  public getUserByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }
}

export interface User {
  username: string;
  password: string;
  role: Roles;
}

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}
