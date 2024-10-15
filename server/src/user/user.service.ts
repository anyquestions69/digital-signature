import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'prisma/prisma.service'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async create(register: RegisterDto) {
		const hashedPassword = await bcrypt.hash(register.password, 10)
		return this.prisma.user.create({
			data: {
				username: register.username,
				name: register.name,
				password: hashedPassword,
				division: register.division,
				job: register.job
			}
		})
	}

	findAll() {
		return this.prisma.user.findMany({ omit: { password: true } })
	}

	async getSubs(postId: number) {
		try {
			const users = await this.prisma.user.findMany({
				select: {
					id: true,
					name: true
				}
			})

			const signedUsers = await this.prisma.signature.findMany({
				where: {
					postId: postId
				},
				select: {
					userId: true
				}
			})

			const signedUserIds = new Set(
				signedUsers.map(signature => signature.userId)
			)
			const result = users.map(user => ({
				id: user.id,
				name: user.name,
				signed: signedUserIds.has(user.id)
			}))

			return {
				result: 'success',
				data: result
			}
		} catch (err) {
			return {
				result: 'failed',
				data: err.message
			}
		}
	}

	findOne(id: number) {
		return this.prisma.user.findFirst({
			where: { id },
			omit: { password: true }
		})
	}
	findByUsername(username: string) {
		return this.prisma.user.findFirst({ where: { username } })
	}
	update(id: number, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			data: updateUserDto,
			where: { id },
			omit: { password: true }
		})
	}
	setAdmin(id: number) {
		return this.prisma.user.update({
			data: { role: 'Admin' },
			where: { id },
			omit: { password: true }
		})
	}

	remove(id: number) {
		return this.prisma.user.delete({ where: { id }, omit: { password: true } })
	}
}
