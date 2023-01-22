import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user.service";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
              private jwtService: JwtService) {}
  async canActivate(
      context: ExecutionContext,
  ) {
    try {
      const request = context.switchToHttp().getRequest();
      const jwt = request.cookies['jwt'];
      const data = this.jwtService.verify(jwt);
      if(data){
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
