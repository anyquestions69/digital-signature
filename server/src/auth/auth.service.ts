import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private rsa: EncryptionService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(register: RegisterDto) {
    const { publicKey, privateKey } = await this.rsa.generateKeys(register.password);
    const user = await this.usersService.findByPhone(register.phone);
    if (user) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
    if (register.password !== register.repass) {
      throw new BadRequestException('Пароли не совпадают');
    }
    const reg = await this.prisma.user.create({data:{
        phone: register.phone,
        name: register.name,
        wallet: String(register.phone),
        role:Guest
      }}
    );
    const payload = { sub: reg.id, phone: reg.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
      privateKey,
      publicKey,
    };
  }

  login(loginDto: LoginDto) {
    return `This action returns all auth`;
  }
}
