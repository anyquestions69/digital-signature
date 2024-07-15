import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignatureService } from './signature.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post('sign/:postId')
  create(
    @Param('postId') postId: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.signatureService.create(+postId, file, req);
  }

  @Get('post/:id')
  findAll(@Param('id') id: string) {
    return this.signatureService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signatureService.findOne(+id);
  }
  @Post('check')
  check(@Body('phone') phone: string, @Body('hash') hash: string) {
    return this.signatureService.checkSignature(phone, hash);
  }
}
