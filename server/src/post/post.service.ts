import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private rsa: EncryptionService,
  ) {}
  create(dto: CreatePostDto, file: Express.Multer.File) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        filename: file.filename,
        hash: 'hashexample',
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        signatures: {
          select: { hash: true, user: { select: { phone: true, name: true } } },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findFirst({
      include: {
        signatures: {
          select: { hash: true, user: { select: { phone: true, name: true } } },
        },
      },
      where: { id: id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ data: updatePostDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id: id } });
  }
}
