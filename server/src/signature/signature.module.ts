import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/prisma.module'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { EncryptionService } from 'src/encryption/encryption.service'
import { PostGateway } from 'src/post/post.gateway'
import { PostModule } from 'src/post/post.module'
import { SignatureController } from './signature.controller'
import { SignatureService } from './signature.service'

@Module({
	imports: [PrismaModule, PostModule],
	controllers: [SignatureController],
	providers: [SignatureService, EncryptionService, JwtStrategy, PostGateway]
})
export class SignatureModule {}
