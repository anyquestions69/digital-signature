import { Controller, Get, Param, Query } from '@nestjs/common'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
		const pageNumber = parseInt(page || '1', 10)
		const limitNumber = parseInt(limit || '10', 10)
		return this.postService.findAll(pageNumber, limitNumber)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(+id)
	}
}
