import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { EncryptionService } from 'src/encryption/encryption.service';

@Module({
  imports: [PrismaModule, MulterModule],
  controllers: [PostController],
  providers: [PostService, EncryptionService],
  exports: [PostService],
})
export class PostModule {}
