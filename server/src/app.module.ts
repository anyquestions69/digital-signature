import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { EncryptionService } from './encryption/encryption.service'
import { PostModule } from './post/post.module'
import { SignatureModule } from './signature/signature.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		PostModule,
		SignatureModule,
		AuthModule,
		AdminModule,
		ConfigModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService, EncryptionService]
})
export class AppModule {}
