import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [SignatureController],
  providers: [SignatureService,EncryptionService],
})
export class SignatureModule {}
