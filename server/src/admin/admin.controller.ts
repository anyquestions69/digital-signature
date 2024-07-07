import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ForbiddenException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private postService: PostService,
  ) {}

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Post('post')
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ) {
    if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin');
    return this.postService.create(createPostDto, file);
  }

  @Patch('post/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete('post/:id')
  removePost(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
