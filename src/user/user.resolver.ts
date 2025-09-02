import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser';
import { AuthResponseDto } from './dto/authResponse.dto';
import { Public } from '../common/decorators/public.decorator';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Mutation(() => AuthResponseDto)
  async createUser(
    @Args('data') data: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const tokens = await this.userService.createUser(data);
    res.cookie('cu_refresh', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
    });

    res.cookie('cu_jwt', tokens.accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax',
    });
    return { access_token: tokens.accessToken };
  }
}
