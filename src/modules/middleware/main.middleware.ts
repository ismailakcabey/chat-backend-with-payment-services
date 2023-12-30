import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
var jwtSecret = require('jsonwebtoken');
export class MainMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    next();
  }
}
