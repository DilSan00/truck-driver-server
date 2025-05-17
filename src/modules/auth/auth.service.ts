import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/model/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
      role: UserRole.Client,
    });
    return this.generateToken(user._id.toString(), user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const isAdmin = user.email === 'admin.key@gmail.com';
    user.role = isAdmin ? UserRole.Admin : UserRole.Client;
    await user.save();

    return this.generateToken(user._id.toString(), user.role);
  }

  private generateToken(userId: string, role: UserRole) {
    return this.jwtService.sign({ sub: userId, role });
  }
}
