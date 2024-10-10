import { Injectable, NotFoundException } from '@nestjs/common'
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
			const data = await this.prisma.post.create({
				data: {
					title: dto.title,
					filename: file.filename,
					hash: 'hashexample',
					userId: id
				}
			})
			return {
				result: 'success',
				data: data
			}
		} catch (error) {
			return {
				result: 'failed',
				data: 'Не удалось создать пост'
			}
		}
	}

	findAll() {
		try {
			return this.prisma.post.findMany({
				include: {
					signatures: {
						select: {
							hash: true,
							user: { select: { username: true, name: true } }
						}
					}
				}
			})
		} catch (error) {
			throw new NotFoundException('Посты не найдены')
		}
	}

	async findOne(id: number) {
		try {
			const posts = await this.prisma.post.findFirst({
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
			if (posts) return posts
		} catch (error) {
			throw new NotFoundException(`Пост с ID ${id} не найден`)
		}
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
