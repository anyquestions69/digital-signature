import {
	Injectable,
	StreamableFile,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { createReadStream } from 'fs'
import { EncryptionService } from 'src/encryption/encryption.service'
import { UserService } from 'src/user/user.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
@Injectable()
export class AuthService {
	constructor(
		private rsa: EncryptionService,
		private usersService: UserService,
		private readonly jwtService: JwtService
	) {}
	async register(register: RegisterDto) {
		const user = await this.usersService.findByUsername(register.username)
		if (user) {
			return {
				result: 'failed',
				data: 'Пользователь с таким логином уже существует'
			}
		}
		if (register.password !== register.repass) {
			return {
				result: 'failed',
				data: 'Пароли не совпадают'
			}
		}
		const reg = await this.usersService.create(register)
		const { publicKey } = await this.rsa.generateKeys(
			register.username,
			register.password
		)
		const payload = {
			id: reg.id,
			username: String(reg.username),
			role: reg.role
		}

		const file = createReadStream('./keys/' + register.username + '/public.pem')
		const res = new StreamableFile(file)
		let publicKeyText = ''

		const reader = res.getStream()
		reader.on('data', chunk => {
			publicKeyText += chunk.toString()
		})
		await new Promise(resolve => {
			reader.on('end', resolve)
		})
		return {
			result: 'success',
			key: publicKeyText,
			token: await this.jwtService.signAsync(payload)
		}
	}

	async login(loginDto: LoginDto) {
		const user = await this.usersService.findByUsername(loginDto.username)
		if (!user) throw new UnauthorizedException('Неверный номер телефона')
		const isValid = await bcrypt.compare(loginDto.password, user.password)

		if (!isValid) {
			return {
				result: 'failed',
				data: 'Неверный пароль'
			}
		}
		const payload = {
			id: user.id,
			username: String(user.username),
			role: user.role
		}
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
	async profile(req) {
		const user = await this.usersService.findOne(req.user.userId)
		if (!user) throw new UnauthorizedException('Неверный номер телефона')
		const { ...data } = user
		return data
	}
}
