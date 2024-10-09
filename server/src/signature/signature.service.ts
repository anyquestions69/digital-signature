import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { EncryptionService } from 'src/encryption/encryption.service'
import { PostGateway } from 'src/post/post.gateway'
import { PostService } from 'src/post/post.service'

@Injectable()
export class SignatureService {
	constructor(
		private prisma: PrismaService,
		private rsa: EncryptionService,
		private postService: PostService,
		private PostGateway: PostGateway
	) {}
	async create(postId: number, file: Express.Multer.File, req) {
		try {
			const key = Buffer.from(file.buffer).toLocaleString()
			const post = await this.postService.findOne(postId)
			if (!post) throw new BadRequestException('No such post')
			const hash = this.rsa.encrypt(post.title, key)
			const check = this.rsa.checkSignature(req.user.username, hash)
			if (check != post.title) throw new BadRequestException('Неверный ключ!')
			const sig = await this.prisma.post.update({
				where: { id: post.id },
				data: {
					signatures: {
						create: [
							{ user: { connect: { id: Number(req.user.userId) } }, hash: hash }
						]
					}
				}
			})
			console.log(
				(await this.prisma.signature.count({ where: { postId: post.id } })) +
					' / ' +
					(await this.prisma.user.count())
			)
			if (
				(await this.prisma.signature.count({ where: { postId: post.id } })) ==
				(await this.prisma.user.count())
			) {
				console.log('Все расписались. Приказ доведен:')
				await this.prisma.post.update({
					data: { delivered: true },
					where: { id: post.id }
				})
				//TODO:
				//триггер для отправки админу о delivered
				this.PostGateway.notifyAdmin(post.id)
			}
			return {
				result: 'success',
				data: sig
			}
		} catch (error) {
			return {
				result: 'failed',
				data: error
			}
		}
	}
	//TODO: for what?
	checkSignature(username, hash) {
		this.rsa.checkSignature(username, hash)
	}

	findAll(id: number) {
		return this.prisma.signature.findMany({
			where: { postId: id },
			include: { user: { select: { name: true } } }
		})
	}
}
