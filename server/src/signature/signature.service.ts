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
  async create(postId: number, file: Express.Multer.File, req:Request) {
    const key = Buffer.from(file.buffer).toLocaleString();
    const post = await this.postService.findOne(postId);
    if (!post) throw new BadRequestException('No such post');
    return this.rsa.encrypt(post.title, key); //this.prisma.signature.create({ data: { postId: postId, userId: req.user.id } });
  }

  checkSignature(phone:string, hash:string){

  }

  findAll() {
    return `This action returns all signature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signature`;
  }

  
}
