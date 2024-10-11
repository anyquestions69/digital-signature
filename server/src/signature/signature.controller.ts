import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { SignatureService } from './signature.service'

@Controller()
export class SignatureController {
	constructor(private readonly signatureService: SignatureService) {}

	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(JwtAuthGuard)
	@Post('sign/:postId')
	create(
		@Param('postId') postId: string,
		@UploadedFile() file: Express.Multer.File,
		@Request() req
	) {
		console.log(postId)
		return this.signatureService.create(+postId, file, req)
	}

	@Get('post/:id')
	findAll(@Param('id') id: string) {
		return this.signatureService.findAll(+id)
	}

	@Post('check')
	check(@Body('username') username: string, @Body('hash') hash: string) {
		return this.signatureService.checkSignature(username, hash)
	}
}
