import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AppService} from "../app.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly appService: AppService,
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
