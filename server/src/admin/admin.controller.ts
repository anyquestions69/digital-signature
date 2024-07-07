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
  Put,
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
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin');
    return this.postService.update(+id, updatePostDto);
  }

  @Delete('post/:id')
  removePost(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin');
    return this.postService.remove(+id);
  }

  @Patch('user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin');
    return this.userService.update(+id, updateUserDto);
  }
  @Put('user/:id')
  setAdmin(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin');
    return this.userService.setAdmin(+id);
  }

  @Delete('user/:id')
  removeUser(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin');
    return this.userService.remove(+id);
  }
}
