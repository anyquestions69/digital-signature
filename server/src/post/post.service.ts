import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { PrismaService } from 'prisma/prisma.service'
import { EncryptionService } from 'src/encryption/encryption.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostService {
	constructor(
		private prisma: PrismaService,
		private rsa: EncryptionService
	) {}

	async create(id: number, dto: CreatePostDto, file: Express.Multer.File) {
		try {
			const buffer = Buffer.from(readFileSync(file.path))

			if (!file || !buffer) {
				throw new Error('Файл не был загружен')
			}

			const data = await this.prisma.post.create({
				data: {
					title: dto.title,
					filename: file.filename,
					content: buffer,
					hash: 'hashexample',
					userId: id
				}
			})
			const payload = {
				title: data.title,
				filename: data.filename,
				hash: data.hash,
				date: data.date,
				content: buffer.toString('base64'),
				userId: data.userId
			}
			return {
				result: 'success',
				data: payload
			}
		} catch (error) {
			return {
				result: 'failed',
				data: error.message || 'Не удалось создать пост'
			}
		}
	}

	async findAll() {
		try {
			const posts = await this.prisma.post.findMany({
				include: {
					signatures: {
						select: {
							hash: true,
							user: { select: { username: true, name: true } }
						}
					}
				}
			})

			const payloads = posts.map(post => ({
				id: post.id,
				title: post.title,
				filename: post.filename,
				hash: post.hash,
				date: post.date,
				content: Buffer.from(post.content).toString('base64'),
				userId: post.userId,
				signatures: post.signatures || {}
			}))

			return {
				result: 'success',
				data: payloads
			}
		} catch (error) {
			return {
				result: 'failed',
				data: 'Посты не найдены'
			}
		}
	}

	async findOne(id: number) {
		try {
			const post = await this.prisma.post.findFirst({
				include: {
					signatures: {
						select: {
							hash: true,
							user: { select: { id: true, username: true, name: true } }
						}
					}
				},
				where: { id: id }
			})
			const payload = {
				title: post.title,
				filename: post.filename,
				hash: post.hash,
				date: post.date,
				content: Buffer.from(post.content).toString('base64'),
				userId: post.userId,
				signatures: post.signatures || []
			}
			if (post)
				return {
					result: 'success',
					data: payload
				}
		} catch (error) {
			return {
				result: 'failed',
				code: `Пост с ID ${id} не найден`
			}
		}
	}
	async service(id: number) {
		return await this.prisma.post.findFirst({
			include: {
				signatures: {
					select: {
						hash: true,
						user: { select: { username: true, name: true } }
					}
				}
			},
			where: { id: id }
		})
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		try {
			const data = this.prisma.post.update({
				data: updatePostDto,
				where: { id: id }
			})
			return {
				result: 'success',
				data: data
			}
		} catch (error) {
			return {
				result: 'failed',
				data: 'Ошибка при обновлении поста'
			}
		}
	}

	remove(id: number) {
		try {
			const data = this.prisma.post.delete({ where: { id: id } })
			return {
				result: 'success',
				data: data
			}
		} catch (error) {
			return {
				result: 'failed',
				data: `Пост с ID ${id} не найден`
			}
		}
	}
}
