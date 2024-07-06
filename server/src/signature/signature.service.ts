import { Injectable } from '@nestjs/common';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SignatureService {
  constructor(private prisma:PrismaService){}
  create(postId:number, file:Express.Multer.File) {
   //return this.prisma.signature.create({data:{postId:postId,user:{connect:}}});
  }

  findAll() {
    return `This action returns all signature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signature`;
  }

  update(id: number, updateSignatureDto: UpdateSignatureDto) {
    return `This action updates a #${id} signature`;
  }

  remove(id: number) {
    return `This action removes a #${id} signature`;
  }
}
