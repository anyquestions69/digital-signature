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
  Req,
} from '@nestjs/common';
import { SignatureService } from './signature.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('sign')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post(':postId')
  create(
    @Param('postId') postId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSignatureDto: UpdateSignatureDto,
  ) {
    return this.signatureService.update(+id, updateSignatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureService.remove(+id);
  }
}
