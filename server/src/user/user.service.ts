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
        wallet: String(register.phone),
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }
  findByPhone(phone: bigint) {
    return this.prisma.user.findFirst({ where: { phone } });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
