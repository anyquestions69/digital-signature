import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';
import { EncryptionService } from 'src/encryption/encryption.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PostModule } from 'src/post/post.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [PrismaModule, PostModule,ClientsModule.register([
    {
      name: 'STAMP_PACKAGE',
      transport: Transport.GRPC,
      options: {
        url: 'stamp:50051',
        package: 'stamp',
        protoPath: 'file.proto',
      },
    },
  ]),],
  controllers: [SignatureController],
  providers: [SignatureService, EncryptionService, JwtStrategy],
})
export class SignatureModule {}
