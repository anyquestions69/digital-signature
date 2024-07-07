import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PrismaModule, PostModule],
  controllers: [SignatureController],
  providers: [SignatureService, EncryptionService, JwtStrategy],
})
export class SignatureModule {}
