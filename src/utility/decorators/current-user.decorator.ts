import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) =>  {
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  },
);