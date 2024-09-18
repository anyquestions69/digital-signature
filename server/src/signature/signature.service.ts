import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PostService } from 'src/post/post.service';
import {StampClientImpl} from 'file'
import * as grpc from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class SignatureService {
  private stampService:StampClientImpl
  constructor(
    private prisma: PrismaService,
    private rsa: EncryptionService,
    private postService: PostService,
    @Inject('STAMP_PACKAGE') private client: ClientGrpc
  ) {
    this.stampService = this.client.getService<StampClientImpl>('Stamp');
  }
  async create(postId: number, file: Express.Multer.File, req) {
    const key = Buffer.from(file.buffer).toLocaleString();
    const post = await this.postService.findOne(postId);
    if (!post) throw new BadRequestException('No such post');
    const hash = this.rsa.encrypt(post.title, key);
    const check = this.checkSignature(req.user.phone, hash);
    if (check != post.title) throw new BadRequestException('Неверный ключ!');
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
    console.log(await this.prisma.signature.count({where:{postId:post.id}}))
    console.log(await this.prisma.user.count())
    if(await this.prisma.signature.count({where:{postId:post.id}})==(await this.prisma.user.count())){
      console.log('Все расписались. Приказ доведен:')
     // const res=await this.stampService.CreateStamp({filename:post.filename})
      //console.log(res.message)
    }
    return sig;
  }

  checkSignature(phone: string, hash: string) {
    return this.rsa.checkSignature(phone, hash);
  }

  findAll(id: number) {
    return this.prisma.signature.findMany({
      where: { postId: id },
      include: { user: { select: { name: true } } },
    });
  }

}
