import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService,
              private jwtService: JwtService) {}
  async canActivate(
      context: ExecutionContext,
  ) {
    try {
      const request = context.switchToHttp().getRequest();
      const jwt = request.cookies['jwt'];
      const data = this.jwtService.verify(jwt);
      const user = await this.userService.findOne({id: data.id});
      if (user.isadmin) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

