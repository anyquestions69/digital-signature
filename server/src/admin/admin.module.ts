import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[UserModule, PostModule],
  controllers: [AdminController],
  providers: [JwtStrategy],
})
export class AdminModule {}
