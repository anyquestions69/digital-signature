import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SignatureModule } from './signature/signature.module';
import { EncryptionService } from './encryption/encryption.service';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [UserModule, PostModule, SignatureModule],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
