import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AdminGuard } from './admin.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    const token = await this.authService.register(dto);
    return { access_token: token };
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);
    return { access_token: token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  getMe(@CurrentUser() user) {
    return this.usersService.findById(user.userId);
  }
}
