import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(register: RegisterDto) {
    const hashedPassword = await bcrypt.hash(register.password, 10);
    return this.prisma.user.create({
      data: {
        phone: register.phone,
        name: register.name,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
      omit: { password: true },
    });
  }
  findByPhone(phone: string) {
    return this.prisma.user.findFirst({ where: { phone } });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: { id },
      omit: { password: true },
    });
  }
  setAdmin(id: number) {
    return this.prisma.user.update({
      data: { role: 'Admin' },
      where: { id },
      omit: { password: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id }, omit: { password: true } });
  }
}
