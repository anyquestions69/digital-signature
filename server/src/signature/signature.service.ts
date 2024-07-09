import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class SignatureService {
  constructor(
    private prisma: PrismaService,
    private rsa: EncryptionService,
    private postService: PostService,
  ) {}
  async create(postId: number, file: Express.Multer.File, req) {
    const key = Buffer.from(file.buffer).toLocaleString();
    const post = await this.postService.findOne(postId);
    if (!post) throw new BadRequestException('No such post');
    const hash = await this.rsa.encrypt(post.title, key);
    const sig = await this.prisma.post.update({
      where: { id: post.id },
      data: {
        signatures: {
          create: [
            { user: { connect: { id: Number(req.user.userId) } }, hash: hash },
          ],
        },
      },
    });
    return sig;
  }

  checkSignature(phone: string, hash: string) {
    return this.rsa.checkSignature(phone, hash);
  }

  findAll() {
    return `This action returns all signature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signature`;
  }
}
