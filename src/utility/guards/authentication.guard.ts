import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
}