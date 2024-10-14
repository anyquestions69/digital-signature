import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { multerOptions } from 'src/config/multer.config'
import { CreatePostDto } from 'src/post/dto/create-post.dto'
import { UpdatePostDto } from 'src/post/dto/update-post.dto'
import { PostService } from 'src/post/post.service'
import { UpdateUserDto } from 'src/user/dto/update-user.dto'
import { UserService } from 'src/user/user.service'

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
	constructor(
		private readonly userService: UserService,
		private postService: PostService
	) {}

	@UseInterceptors(FileInterceptor('file', multerOptions))
	@Post('post')
	create(
		@UploadedFile() file: Express.Multer.File,
		@Body() createPostDto: CreatePostDto,
		@Request() req
	) {
		if (req.user.role !== 'Admin') {
			throw new ForbiddenException('Not admin')
		}

		return this.postService.create(req.user.userId, createPostDto, file)
	}

	@Get('subs/:postId')
	getSubs(@Param('postId') postId: string, @Request() req) {
		if (req.user.role !== 'Admin') {
			return {
				result: 'failed',
				data: 'Отказано в доступе'
			}
		}
		return this.userService.getSubs(+postId)
	}

	@Patch('post/:id')
	updatePost(
		@Param('id') id: string,
		@Body() updatePostDto: UpdatePostDto,
		@Request() req
	) {
		if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin')
		return this.postService.update(+id, updatePostDto)
	}

	@Delete('post/:id')
	removePost(@Param('id') id: string, @Request() req) {
		if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin')
		return this.postService.remove(+id)
	}

	@Put('user/:id')
	updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}
	@Patch('user/:id')
	setAdmin(@Param('id') id: string, @Request() req) {
		if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin')
		return this.userService.setAdmin(+id)
	}

	@Delete('user/:id')
	removeUser(@Param('id') id: string, @Request() req) {
		if (req.user.role !== 'Admin') throw new ForbiddenException('Not admin')
		return this.userService.remove(+id)
	}
}
