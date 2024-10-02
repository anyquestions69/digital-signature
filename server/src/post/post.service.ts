import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
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

	async create(dto: CreatePostDto, file: Express.Multer.File) {
		try {
			return await this.prisma.post.create({
				data: {
					title: dto.title,
					filename: file.filename,
					hash: 'hashexample'
				}
			})
		} catch (error) {
			throw new BadRequestException('Ошибка при создании поста')
		}
	}

	findAll() {
		try {
			return this.prisma.post.findMany({
				include: {
					signatures: {
						select: {
							hash: true,
							user: { select: { phone: true, name: true } }
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
							user: { select: { phone: true, name: true } }
						}
					}
				},
				where: { id: id }
			})
			if (posts) return posts
			console.log('eopriwjg')
		} catch (error) {
			throw new NotFoundException(`Пост с ID ${id} не найден`)
		}
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		try {
			return this.prisma.post.update({ data: updatePostDto, where: { id } })
		} catch (error) {
			throw new BadRequestException('Ошибка при обновлении поста')
		}
	}

	remove(id: number) {
		try {
			return this.prisma.post.delete({ where: { id: id } })
		} catch (error) {
			throw new NotFoundException(`Пост с ID ${id} не найден`)
		}
	}
}
