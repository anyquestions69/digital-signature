import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	Res
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { createReadStream } from 'fs'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() createAuthDto: RegisterDto) {
		return this.authService.register(createAuthDto)
	}

	@Get('public-key/:username')
	async getPublicKey(
		@Param('username') username: string,
		@Res() res: Response
	) {
		const file = createReadStream(`./keys/${username}/public.pem`)
		res.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': `attachment; filename="${username}-public.pem"`
		})
		file.pipe(res)
	}

	@Post('/login')
	create(@Body() createAuthDto: LoginDto) {
		return this.authService.login(createAuthDto)
	}
	@UseGuards(AuthGuard('jwt'))
	@Get('/profile')
	profile(@Request() req) {
		return this.authService.profile(req)
	}
}
