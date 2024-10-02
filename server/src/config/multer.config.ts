import { HttpException, HttpStatus } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'

dotenv.config()

export const multerConfig = {
	dest: process.env.UPLOAD_LOCATION
}

export const multerOptions = {
	/* limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    }, */
	fileFilter: (req: any, file: any, cb: any) => {
		if (file.mimetype.match(/\/(pdf)$/)) {
			cb(null, true)
		} else {
			cb(
				new HttpException(
					`Unsupported file type ${extname(file.originalname)}`,
					HttpStatus.BAD_REQUEST
				),
				false
			)
		}
	},

	storage: diskStorage({
		destination: (req: any, file: any, cb: any) => {
			const uploadPath = multerConfig.dest
			if (!existsSync(uploadPath)) {
				mkdirSync(uploadPath)
			}
			cb(null, uploadPath)
		},

		filename: (req: any, file: any, cb: any) => {
			cb(null, `${uuid()}${extname(file.originalname)}`)
		}
	})
}

export class ConfigModule {}
