import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AppService} from "../app.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly appService: AppService,
              private jwtService: JwtService) {}
  async canActivate(
      context: ExecutionContext,
  ) {
    try {
      const request = context.switchToHttp().getRequest();
      console.log(request);
      const jwt = request.cookies['jwt'];
      const data = this.jwtService.verify(jwt);
      const user = await this.appService.findOne({id: data.id});
      if (user.isadmin) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

