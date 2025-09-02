import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createUser({
    email,
    first_name,
    last_name,
    password,
  }: CreateUserInput): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const hashPassword = await this.authService.hashPassword(password);
      const user = await this.prisma.user.create({
        data: { password: hashPassword, email, first_name, last_name },
      });
      const accessToken = await this.authService.generateJwtAccessToken({
        id: user.id,
        email,
        role: user.role,
      });
      const refreshToken = await this.authService.generateJwtRefreshToken({
        id: user.id,
        email,
        role: user.role,
      });
      return { accessToken, refreshToken };
    } catch {
      throw new BadRequestException();
    }
  }
}
