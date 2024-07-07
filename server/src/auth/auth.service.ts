import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private rsa: EncryptionService,
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(register: RegisterDto) {
    const user = await this.usersService.findByPhone(register.phone);
    if (user) {
      throw new ConflictException(
        'Пользователь с таким номером уже существует',
      );
    }
    if (register.password !== register.repass) {
      throw new BadRequestException('Пароли не совпадают');
    }
    const reg = await this.usersService.create(register);
    const { publicKey } = await this.rsa.generateKeys(
      String(register.phone),
      register.password,
    );
    const payload = { id: reg.id, phone: reg.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
      publicKey,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByPhone(loginDto.phone);
    const isValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, phone: user.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}