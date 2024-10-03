import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			usernameField: 'username',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'YOUR_SECRET_KEY' // Replace with your secret key
		})
	}

	async validate(payload: any) {
		return {
			userId: payload.id,
			username: payload.username,
			role: payload.role
		}
	}
}
