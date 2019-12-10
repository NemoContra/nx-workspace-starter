import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
@Injectable()
export class UserService {

  private users: User[] = [
    { username: 'admin', password: hashSync('password') },
    { username: 'fflieger', password: hashSync('1234') }
  ];

  public getUserByUsername(username: string): User {
    return this.users.find(user => user.username === username);
  }
}

export interface User {
  username: string;
  password: string;
}
