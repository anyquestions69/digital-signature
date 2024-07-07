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

@Controller('sign')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(
    @Param('postId') postId: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    return this.signatureService.create(+postId, file, req);
  }

  @Get()
  findAll() {
    return this.signatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signatureService.findOne(+id);
  }
}
