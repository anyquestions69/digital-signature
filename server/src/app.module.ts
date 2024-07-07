import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SignatureModule } from './signature/signature.module';
import { EncryptionService } from './encryption/encryption.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UserModule, PostModule, SignatureModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
